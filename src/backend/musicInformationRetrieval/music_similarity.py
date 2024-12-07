import numpy as np

query = np.array([[]]) #matrix consist of ATB, RTB, FTB
music_data = np.array([[[]]]) #matrix 3 dimensi: [idx lagu][distribusi tone ATB, RTB, FTB][value]

def cos_sim(query) :
    arr_mag_query = [] # index: ATB, RTB, FTB
    arr_res = []
    val = music_data.shape[2] #get number of values (q: apkh banyak numbers yg di extract dari hist selalu sama?)
    n = music_data.shape[0]
    #get data magnitude of tones in query
    for i in range(3) :
        mag_query = 0
        for j in range(val) :
            mag_query += ((query[i][j]) ** 2)
        mag_query = np.sqrt(mag_query) #better di sqrt di sini atau sekalian bareng yak (nanti dicoba bagusan yg mana)
        arr_mag_query.append(mag_query)
    #compute cos similarity
    for i in range(n) :
        arr_res[i].append(i)
        for j in range(3) :
            num = 0
            mag_data = 0
            for k in range(val) :
                num += (query[j][k] * music_data[i][j][k])
                mag_data += ((music_data[i][j]) ** 2)
            mag_data = np.sqrt(mag_data)
            angle = np.arcos(num / (mag_query * mag_data))
            arr_res[i][1].append(angle)
    return arr_res

# def retrieve_music() :
    #bagusnya parameter terkecil tones mana dulu? ATB or RTB or FTB