import os
import numpy as np
from PIL import Image

def grayscale(filename):
    image = Image.open(filename).resize((256, 256))
    
    img_array = np.array(image)
    
    grayscale_array = (0.299 * img_array[:, :, 0] + 0.587 * img_array[:, :, 1] + 0.114 * img_array[:, :, 2]).astype(np.uint8)
    
    grayscale_image = Image.fromarray(grayscale_array, mode="L")
    
    grayscale_image.save(f"{filename}_grayscale.jpg")
    
    grayscale_vector = grayscale_array.flatten()
    
    return grayscale_vector

def standardize_images(image_arrays):
    image_stack = np.stack(image_arrays, axis=0)
    
    pixel_mean = np.mean(image_stack, axis=0)
    
    standardized_images = image_stack - pixel_mean

    return standardized_images
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

def matriks_kovarians(n, x):
    x_numpy = np.array(x)
    c = (np.dot(x_numpy.T, x_numpy)/n)
    return c

def proyeksi_data(k, u, standardized) :
    k = 2  
    u_k = u[:, :k]

    z = np.dot(standardized, u_k)

    return z

def process_images(folder_path):
    print("gambar")
    image_arrays = []
    
    # Baca semua file gambar di folder
    for filename in os.listdir(folder_path):
            image_path = os.path.join(folder_path, filename)
            img_array = grayscale(image_path)
            image_arrays.append(img_array)

    standardized_images = standardize_images(image_arrays)
    image_kovarians = matriks_kovarians(5000,image_arrays)
    u, sigma, v = np.linalg.svd(image_kovarians)
    hasil = proyeksi_data(3, u, standardized_images)
    print(hasil)

