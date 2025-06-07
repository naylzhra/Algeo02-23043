<h1> MuseIc </h1>

Sebuah website yang dapat melakukan image information retrieval dan music information retrieval. Program menerima input dataset lagu, dataset gambar album, dan file query terkait. Program dapat mendeteksi gambar album beserta lagu dari query yang dimasukkan. Program ini menerapkan aplikasi matriks, vektor, cos similarity, dan euclidean distance dalam penentuan kemiripan query dengan dataset. Program ini dibuat untuk memenuhi Tugas Besar 2 IF2123 Aljabar Linear dan Geometri.

<div id="contributor">
  <strong>
    <h3>Dibuat oleh Kelompok 14 - Menjajal Nilai Maksimal</h3>
    <table align="center">
      <tr>
        <td>NIM</td>
        <td>Nama</td>
      </tr>
      <tr>
        <td>13523043</td>
        <td>Najwa Kahani Fatima</td>
      </tr>
      <tr>
        <td>13523050</td>
        <td>Mayla Yaffa Ludmilla</td>
      </tr>
      <tr>
        <td>13523079</td>
        <td>Nayla Zahira</td>
      </tr>
    </table>
  </strong>
</div>

## Technologies Used
### Front-End
- Next.js
- React
- Tailwind CSS

### Back-End
- FastAPI
- Python

## Installing / Getting started
Anda perlu menginstall pip dan Node.js.
Setelah itu, install package package di bawah ini dengan run kode :
```shell
pip install pillow
pip install mido
pip install numpy
pip install scipy
pip install rarfile
pip install zipfile
pip install shutil
pip install uvicorn
pip install fastapi
pip install python-multipart
npm install react
npm install next
```
### Initial Configuration

Buka 2 terminal.
Di terminal pertama, navigasi ke folder backend, lalu jalankan API.
```shell
cd src/backend
uvicorn app:app --reload
```
Di terminal ke dua, navigasi ke folder frontend, lalu jalankan interface.

```shell
cd src/frontend
npm run dev
```
Jika port tidak terpakai, website akan dijalankan di http://localhost:3000. CTRL+klik link tersebut di terminal Anda. 


## Developing

### Building


### Deploying / Publishing

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy awesome-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Features

* Query by Humming
* Album Finder

## Contributing
Apabila Anda ingin berkontribusi dalam projek ini, silakan fork repository ini dan gunakan feature branch. Pull requests akan diterima dengan hangat.

## Links
- Repository: https://github.com/najwakahanifatima/Algeo02-23043

## Licensing

"The code in this project is licensed under MIT license."
