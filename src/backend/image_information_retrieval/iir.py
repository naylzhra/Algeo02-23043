import os
import numpy as np
from PIL import Image
from scipy.sparse.linalg import svds
import numpy as np

K_Components = 10  #bisa diubah2 ya wak

def grayscale(filename):
    #convert image to grayscale, resize to 64 x 64, then flatten to be a vector
    image = Image.open(filename).resize((144, 144))
    grayscale_image= image.convert("L")
    grayscale_array = np.array(grayscale_image)
    grayscale_vector = grayscale_array.flatten()
    return grayscale_vector

def standardize(image_arrays):
    #get the standardized data
    image_stack = np.stack(image_arrays, axis=0)
    pixel_avg = np.mean(image_stack, axis=0)
    pixel_std = np.where(image_stack.std(axis=0) == 0, 1, image_stack.std(axis=0))
    return ((image_stack - pixel_avg) / pixel_std).astype(np.float64), pixel_avg, pixel_std

def comp_covariance(standardized_data):
    #compute matrix covariance
    return np.cov(standardized_data, rowvar=False, dtype=np.float64)

def comp_svd(covariance_data, k):
    #get eig vectors and values U_K, S, VT from SVD
    Uk, S, VT = svds(covariance_data, k=k)
    return Uk, S, VT

def projection_data(standardized_data, U):
    #get the Z matrix (data projection)
    return np.dot(standardized_data, U)

def process_data_image(folder_path):
    image_pixel_data = []
    image_name = []
    
    #read all imaged from folder database
    i = 0
    with os.scandir(folder_path) as entries:
        for i, filename in enumerate(entries): #adjusted
            image_path = os.path.join(folder_path, filename)
            if os.path.isfile(image_path):  # Ensure it's a file
                img_array = grayscale(image_path)
                image_pixel_data.append(img_array)
                image_name.append((i, filename))
                i += 1
    
    standardized_data, pixel_avg, pixel_std = standardize(image_pixel_data)
    
    covariance_data = comp_covariance(standardized_data)
    
    # np.random.seed(42)
    Uk, S, VT = comp_svd(covariance_data, k=K_Components)
    # Uk = get_Uk(U, K_Components)
    # U, S, VT = np.linalg.svd(covariance_data, full_matrices=False)
    
    # UK = U[:,:K_Components]
    
    row, col = Uk.shape
    print("row UK: " + str(row))
    print("col UK: " + str(col))
    
    # projected_data = projection_data(standardized_data, UK)
    projected_data = projection_data(standardized_data, Uk)
    
    explained_variance_ratio = S / S.sum()
    print("evr: " + str(explained_variance_ratio))
    
    return projected_data, pixel_avg, pixel_std, image_name, Uk #cekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

def project_query(query, pixel_avg, pixel_std, Uk):
    return np.dot(((query - pixel_avg)/pixel_std), Uk)

def euc_dist(projected_query, projected_data):
    return [(index, np.linalg.norm(projected_query - value)) for index, value in enumerate(projected_data)]

def process_query(file_name, folder_path):
    #get variables from dataset
    projected_data, pixel_avg, pixel_std, image_name, Uk = process_data_image(folder_path)
    
    #process query pixels
    query_raw = grayscale(file_name)
    projected_query = project_query(query_raw, pixel_avg, pixel_std, Uk)
    projected_query = (projected_query.reshape(-1,1)).T
    
    #get sorted euclidian distance
    euc_distance = euc_dist(projected_query, projected_data)
    sorted_euc_distance = sorted(euc_distance, key=lambda x: x[1])
    sorted_euc_dist_indices = [item[0] for item in sorted_euc_distance]
    
    #print sorted result
    for index in sorted_euc_dist_indices:
        print(image_name[index][1])
        
        

from datetime import datetime

start_time = datetime.now()

process_query("database_image/test/lion1.jpg", "database_image/test")

# Your computation here
result = sum(range(10**6))

end_time = datetime.now()
duration = end_time - start_time  # This gives a timedelta object

print(f"Computation took {duration}")