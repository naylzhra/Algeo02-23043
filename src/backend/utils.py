import json

def txt_to_json(input_file, output_file):
    # Open and read the input file
    with open(input_file, 'r') as file:
        lines = file.readlines()
    
    # Skip the header (first line) and process each subsequent line
    result = []
    for line in lines[1:]:  # Start from the second line (skip the header)
        parts = line.strip().split()
        
        # Ensure the line has the expected format (audio_file, audio_name, pic_name)
        if len(parts) >= 3:
            audio_file = parts[0]
            audio_name = " ".join(parts[1:len(parts)-1])  # Join everything in between as audio_name
            pic_name = parts[len(parts)-1]
            
            # Append the data as a dictionary
            result.append({
                "audio_file": audio_file,
                "audio_name": audio_name,
                "pic_name": pic_name
            })
    
    # Write the result to the output JSON file
    with open(output_file, 'w') as file:
        json.dump(result, file, indent=2)