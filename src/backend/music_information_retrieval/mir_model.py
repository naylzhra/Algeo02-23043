from music_similarity import *

file_name = "Tico_Tico.mid"

music_name, music_data = process_music_database()

result = retrieve_music()

print(music_name)

print(music_name[result[0][0]])