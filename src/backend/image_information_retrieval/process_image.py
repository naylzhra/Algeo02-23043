import os
import numpy as np
from PIL import Image
from scipy.sparse.linalg import svds
from image_similarity import projected_query

import numpy as np

# def compute_covariance_in_chunks(data, chunk_size):
#     n_features = data.shape[1]
#     cov_matrix = np.zeros((n_features, n_features), dtype=np.float32)  # Use float32 to save memory
#     n_samples = data.shape[0]

#     for start in range(0, n_samples, chunk_size):
#         end = min(start + chunk_size, n_samples)
#         chunk = data[start:end]
#         # Compute the covariance of the chunk
#         cov_chunk = np.cov(chunk, rowvar=False)
#         # Accumulate the covariance
#         cov_matrix += cov_chunk * (chunk.shape[0] - 1)  # Adjust for sample size

#     # Normalize by the total number of samples
#     cov_matrix /= (n_samples - 1)
#     return cov_matrix


def grayscale(filename):
    image = Image.open(filename).resize((64, 64))
    grayscale_image= image.convert("L")
    grayscale_array = np.array(grayscale_image)
    grayscale_vector = grayscale_array.flatten()
    return grayscale_vector

def standardize_images(image_arrays):
    image_stack = np.stack(image_arrays, axis=0)
    pixel_mean = np.mean(image_stack, axis=0)
    pixel_std = np.std(image_stack, axis=0)
    
    pixel_std[pixel_std == 0] = 1
    
    standardized_images = (image_stack - pixel_mean) / pixel_std
    # standardized_images = (image_stack - pixel_mean)
    # standardized_images = np.array(standardized_images, dtype=np.float32) 

    return standardized_images, pixel_mean, pixel_std


# def matriks_kovarians(n, x):
#     x_numpy = np.array(x)
#     c = (np.matmul(x_numpy.T, x_numpy)/n)
#     return c

def proyeksi_data(U_k, standardized) :
    z = np.dot(standardized, U_k)
    return z

def process_images(folder_path):
    # print("gambar")
    image_arrays = []
    image_name_arrays = []
    
    # Baca semua file gambar di folder
    i = 0
    for filename in sorted(os.listdir(folder_path)):
        image_path = os.path.join(folder_path, filename)
        img_array = grayscale(image_path)
        image_arrays.append(img_array)

        image_name_array = []
        image_name_array.append(i)
        image_name_array.append(filename)
        image_name_arrays.append(image_name_array)
        i += 1

    print()
    print("IMAGE DATA")
    print(image_name_arrays)

    standardized_images, avg_pixel, pixel_std = standardize_images(image_arrays)
    print()
    print("Standardized Image")
    row, col = standardized_images.shape
    print("Row: " + str(row))
    print("Col: " + str(col))
    print(standardized_images)
    print("========================================")
    
    #image_kovarians = matriks_kovarians(len(image_arrays),standardized_images)
    image_kovarians = np.cov(standardized_images, rowvar= False, dtype=np.float64)
    # image_kovarians =  compute_covariance_in_chunks(standardized_images, 5000)
    row, col = image_kovarians.shape
    print()
    print("Kofarian")
    print("Row: "+ str(row))
    print("Col: "+ str(col))
    print(image_kovarians)
    print("========================================")
    
    k = 5
    np.random.seed(30)
    u, s, v = svds(image_kovarians, k=k)
    # u, s, v = np.linalg.svds(image_kovarians, full_matrices=False)    
    U_k = u[:, :k]
    row, col = U_k.shape
    print()
    print("U_k Matrix" )
    print("Row: " + str(row))
    print("Col: " + str(col))
    print(U_k)
    print("========================================")
    
    projected_data = proyeksi_data(U_k, standardized_images)
    row, col = projected_data.shape
    print()
    print("HASIL")
    print("Row: " + str(row))
    print("Col: " + str(col))
    print(projected_data)
    
    return projected_data, avg_pixel, U_k, image_name_arrays, pixel_std

######################################################

hasil_proses , avg_pixel, U_k, image_name_arrays, pixel_std = process_images("database_image/test")

# print(avg_pixel)

query_file = "database_image/test/lala1.jpg"
vector_query = grayscale(query_file)

# row = vector_query.shape
# print(row)
print()
print("VECTOR QUERY")
print(vector_query)

# print(row)
# print(col)
# print()
# print("U_K")
# print(U_k)

q = projected_query(vector_query, avg_pixel, U_k, pixel_std)
row = q.shape
print()
print("Projected Query")
print("Row: " + str(row))
print(q)
print("--------------------------------")

q = q.reshape(-1, 1)
newQ = q.T
row = newQ.shape
# print(row)
print()
print("projected query NEW")
print(newQ)
print("--------------------------------")

euc_dist = [(index, np.linalg.norm(q - value)) for index, value in enumerate(hasil_proses)]
sorted_euc_dist = sorted(euc_dist, key=lambda x: x[1])
sorted_euc_dist_indices = [item[0] for item in sorted_euc_dist]

row = sorted_euc_dist
# print(row)
print("sorted euc dist")
print(sorted_euc_dist)
print("--------------------------------")

print()
print("SORTED EUC INDEX")
print(sorted_euc_dist_indices)
print("--------------------------------")


print()
print("query " + query_file)
for el in sorted_euc_dist_indices :
    print(image_name_arrays[el][1])
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

'''
hasil = retrieve_img(hasil_proses, q, avg_pixel, u_k)
print("retrieve_img")
print(hasil)

hasilnp = np.array(hasil)
row = hasilnp.shape
print(row)
'''

'''
def svd(a):
    row, col = a.shape

    a_transpose = a.T
    a_multiplied = np.dot(a_transpose, a)
    nilai_eigen, v = np.linalg.eig(a_multiplied)

    idx = np.argsort(nilai_eigen)[::-1]  
    nilai_eigen = nilai_eigen[idx]
    v = v[:, idx]

    v_satuan = []
    v_transpose = v.T
    for vector in v_transpose :
        vector_satuan = []
        sum = 0
        for el in vector :
            sum += el**2
        besar_vector = sum**(1/2)
        for el in vector :
            temp = el/besar_vector
            vector_satuan.append(temp)
        v_satuan.append(vector_satuan)
    
    v_satuan = np.array(v_satuan).T

    nilai_singular = np.sqrt(np.maximum(nilai_eigen, 0))

    u = []
    for i in range(len(nilai_singular)):
        if nilai_singular[i] > 0:  
            u_column = np.dot(a, v[:, i]) / nilai_singular[i]
        else:
            u_column = np.zeros(row)
        u.append(u_column)
    u = np.array(u).T

    u /= np.linalg.norm(u, axis=0)

    sigma = [[0 for i in range(col)] for j in range(row)]
    for i in range(row) :
        sigma[i][i] = np.sqrt(nilai_eigen[i])
#
    return u, sigma, v_satuan
'''