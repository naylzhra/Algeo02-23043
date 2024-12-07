import numpy as np
# from pemrosesanAudio import extract_notes, normalize_pitch, window


def histogram(data, bins, min, max):
    histogram, _ = np.histogram(data, bins=bins, range=(min, max))
    if(np.sum(histogram) != 0):
        histogram = histogram / np.sum(histogram)
    return histogram

def absolute_tone_based(arrMidi):
    bins = 128
    return histogram(arrMidi, bins, 0, 127)

def relative_tone_based(arrMidi):
    if len(arrMidi) < 2:
        raise ValueError("arrMidi must contain at least two notes for relative tone calculation.")
    diffs = [arrMidi[i + 1] - arrMidi[i] for i in range(len(arrMidi) - 1)]
    bins = 255
    return histogram(diffs, bins, -127, 127)

def first_tone_based(arrMidi):
    if not arrMidi:
        raise ValueError("arrMidi must contain at least one note.")
    diffs = [note - arrMidi[0] for note in arrMidi]
    bins = 255
    return histogram(diffs, bins, -127, 127)


# # test
# midi_file_path = "Let_Me_Be_Free.mid"
# notes = extract_notes(midi_file_path)
# normalized_notes = normalize_pitch(notes)
# windows = window(normalized_notes, window_size=20, step_size=4)
# for window in windows:
#     atb_histogram = absolute_tone_based(window)
#     rtb_histogram = relative_tone_based(window)
#     ftb_histogram = first_tone_based(window)
# print(f"ATB Histogram: {atb_histogram}")
# print(f"RTB Histogram: {rtb_histogram}")
# print(f"FTB Histogram: {ftb_histogram}")
