import os
from pemrosesan_musik import *
from ekstraksi_fitur import *


def process_music_database():
    database_music_path = "../database_music"
    musicdata = []
    music_name = []

    for file_name in os.listdir(database_music_path):
        file_path = os.path.join(database_music_path, file_name)
        
        if file_name.endswith(".mid"):
            print(f"Processing {file_name}...")

            temp = []
            notes = extract_notes(file_path)
            if (notes):
                normalized_notes = normalize_pitch(notes)
                windows = windowing(normalized_notes, window_size=20, step_size=4)
                for window in windows:
                    atb_histogram = absolute_tone_based(window)
                    rtb_histogram = relative_tone_based(window)
                    ftb_histogram = first_tone_based(window)
                    temp.append(atb_histogram)
                    temp.append(rtb_histogram)
                    temp.append(ftb_histogram)
                music_name.append(file_name)
                musicdata.append(temp)
            else:
                print(f"{file_name}: No note in channel 1 detected.")
                 
    return music_name, musicdata


# print(process_music_database())