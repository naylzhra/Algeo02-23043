import numpy as np
from process_music_database import *

# query = np.array([[]]) #matrix consist of ATB, RTB, FTB
# music_data = np.array([[[]]]) #matrix 3 dimensi: [idx lagu][distribusi tone ATB, RTB, FTB][value]
music_name, music_data = process_music_database()
file_name = "Tico_Tico.mid" #trial

def process_query():
    database_music_path = "../database_music"
    file_path = os.path.join(database_music_path, file_name)
    
    data_query = []
    
    if file_name.endswith(".mid"):
        print(f"Processing {file_name}")
        notes = extract_notes(file_path)
        if (notes):
                normalized_notes = normalize_pitch(notes)
                windows = windowing(normalized_notes, window_size=20, step_size=4)
                for window in windows:
                    atb_histogram = absolute_tone_based(window)
                    rtb_histogram = relative_tone_based(window)
                    ftb_histogram = first_tone_based(window)
                    data_query.append(atb_histogram)
                    data_query.append(rtb_histogram)
                    data_query.append(ftb_histogram)

    return data_query

def cos_sim() :
    #similarity computation using cosinus similarity
    magnitude_query = np.array([]) # index: ATB, RTB, FTB
    query = process_query()
    ATB_query = np.array(query[0])
    RTB_query = np.array(query[1])
    FTB_query = np.array(query[2])

    cos_sim_result_avg = []
    # val = music_data.shape[2] #get number of values (q: apkh banyak numbers yg di extract dari hist selalu sama?)
    # n = music_data.shape[0]
    
    #get data magnitude of tones in query
    magnitude = np.linalg.norm(ATB_query)
    magnitude_query = np.append(magnitude_query, magnitude)
    magnitude = np.linalg.norm(RTB_query)
    magnitude_query = np.append(magnitude_query, magnitude)
    magnitude = np.linalg.norm(FTB_query)
    magnitude_query = np.append(magnitude_query, magnitude)
        
    #compute cos similarity
    num_data = len(music_data)
    print("numdata: " + str(num_data))
    for idx_music in range(num_data) :
        temp_cos_sim = []
        for tone_dist in range(3) :
            dot_product = np.dot(query[tone_dist], music_data[idx_music][tone_dist])
            norm_query = np.linalg.norm(query[tone_dist])
            norm_music_data = np.linalg.norm(music_data[idx_music][tone_dist])
            res_cosine_sim = dot_product / (norm_query * norm_music_data)
            temp_cos_sim.append(res_cosine_sim)
        avg_cosine_sim = np.mean(temp_cos_sim)
        #semakin besar cos_sim, semakin kecil sudut, semakin mirip
        cos_sim_result_avg.append([idx_music, avg_cosine_sim])
        
    print(cos_sim_result_avg)
        
    return cos_sim_result_avg

def retrieve_music() :
    res = cos_sim()
    res.sort(key=lambda x:x[1], reverse=True)
    print(res)
    
    return res