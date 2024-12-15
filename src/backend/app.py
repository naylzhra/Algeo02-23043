from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
import zipfile

app = FastAPI()

UPLOAD_DIR = "database"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def save_and_unzip_file(file: UploadFile, subdir: str):
    """Save and unzip uploaded file to the server."""
    target_dir = os.path.join(UPLOAD_DIR, subdir)
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
    
    file_path = os.path.join(target_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    
    # Unzip the file if it is a zip file
    if zipfile.is_zipfile(file_path):
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall(target_dir)
        os.remove(file_path)  # Remove the zip file after extraction

    return target_dir

@app.post("/upload-database-audio/")
async def upload_database_audio(file: UploadFile = File(...)):
    try:
        path = save_and_unzip_file(file, "audio")
        return JSONResponse(content={"message": f"{path}"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload-database-image/")
async def upload_database_image(file: UploadFile = File(...)):
    try:
        path = save_and_unzip_file(file, "images")
        return JSONResponse(content={"message": f"{path}"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload-mapper/")
async def upload_mapper(file: UploadFile = File(...)):
    try:
        save_and_unzip_file(file, "mappers")
        return JSONResponse(content={"message": "Mapper file uploaded and unzipped successfully!"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/process-query/")

@app.post("/start-query/")
async def start_query(file: UploadFile = File(...)):
    try:
        save_and_unzip_file(file, "queries")

        return JSONResponse(content={"message": "Query started successfully!"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))