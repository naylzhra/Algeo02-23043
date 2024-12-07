from mido import MidiFile
import numpy as np

# ekstrak midi file
def extract_notes(midi_file_path):
    midi = MidiFile(midi_file_path)
    notes = []
    for track in midi.tracks:
        for msg in track:
            if msg.type == 'note_on' and msg.channel==0 and msg.velocity > 0: #channel==0 adalah channel 1
                notes.append(msg.note)
    return notes

# normalisasi note
def normalize_pitch(notes):
    avg_pitch = np.mean(notes)
    std_pitch = np.std(notes)
    if std_pitch == 0:
        return [0 for note in notes]
    normalized_notes = [(note - avg_pitch)/std_pitch for note in notes]
    return normalized_notes

# windowing
def windowing(notes, window_size, step_size):
    windows = []
    for start in range(0, len(notes) - window_size + 1, step_size):
        window = notes[start:start + window_size]
        windows.append(window)
    return windows

# # testing
# midi_file_path = "../databaseMusic/Delicado.mid" 
# notes = extract_notes(midi_file_path)
# normalized_notes = normalize_pitch(notes)
# windows = windowing(normalized_notes, window_size=20, step_size=4)
