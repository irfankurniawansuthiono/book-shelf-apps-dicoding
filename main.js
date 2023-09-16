const judulBuku = document.querySelector('#inputBookTitle');
const penulisBuku = document.querySelector('#inputBookAuthor');
const tahunBuku = document.querySelector('#inputBookYear');
const selesaiDibaca = document.querySelector('#inputBookIsComplete');
const tombolMasukkanRak = document.querySelector('#bookSubmit');
const buttonText = document.querySelector('#bookSubmit span');
const rakBukuBelumSelesaiDibaca = document.querySelector('#incompleteBookshelfList');
const rakBukuSelesaiDibaca = document.querySelector('#completeBookshelfList');
const searchInput = document.querySelector('#searchBookTitle');
const kunciLokalBuku = 'BUKU';

const updateWithoutRefresh = ()=>{
    rakBukuBelumSelesaiDibaca.innerText = '';
    rakBukuSelesaiDibaca.innerText = '';
    let localStorageItems = localStorage.getItem(kunciLokalBuku);
    let localStorageItemsJSON = JSON.parse(localStorageItems)
    if(localStorageItemsJSON.length > 0){
        localStorageItemsJSON.map((data)=>{
            if(data.isComplete === false){
                rakBukuBelumSelesaiDibaca.innerHTML +=`<article class="book_item">
                                                    <h3>${data.title}</h3>
                                                    <p>Penulis: ${data.author}</p>
                                                    <p>Tahun: ${data.year}</p>
                                                    
                                                    <div class="action">
                                                      <button class="green" data-id=${data.id}>Tandai selesai</button>
                                                      <button class="red" data-id=${data.id}>Hapus buku</button>
                                                    </div>
                                                  </article>`
            }else{
                rakBukuSelesaiDibaca.innerHTML += `<article class="book_item">
                                                    <h3>${data.title}</h3>
                                                    <p>Penulis: ${data.author}</p>
                                                    <p>Tahun: ${data.year}</p>
                                                    
                                                    <div class="action">
                                                      <button class="green" data-id=${data.id}>Tandai belum selesai</button>
                                                      <button class="red" data-id=${data.id}>Hapus buku</button>
                                                    </div>
                                                  </article>`
            }
        })
    }else{
        rakBukuBelumSelesaiDibaca.innerHTML = `<p>Data Buku Kosong!</p>`;
        rakBukuSelesaiDibaca.innerHTML = `<p>Data Buku Kosong!</p>`;
    }
}

const updateOnSearch = (e)=>{
    rakBukuBelumSelesaiDibaca.innerText = '';
    rakBukuSelesaiDibaca.innerText = '';
    let localStorageItems = localStorage.getItem(kunciLokalBuku);
    let localStorageItemsJSON = JSON.parse(localStorageItems)
    if(localStorageItemsJSON.length > 0){
        const filteredJSON = localStorageItemsJSON.filter(data => data.title.includes(e))
        filteredJSON.map((data)=>{
            if(data.isComplete === false){
                rakBukuBelumSelesaiDibaca.innerHTML +=`<article class="book_item">
                                                    <h3>${data.title}</h3>
                                                    <p>Penulis: ${data.author}</p>
                                                    <p>Tahun: ${data.year}</p>
                                                    
                                                    <div class="action">
                                                      <button class="green" data-id=${data.id}>Tandai selesai</button>
                                                      <button class="red" data-id=${data.id}>Hapus buku</button>
                                                    </div>
                                                  </article>`
            }else{
                rakBukuSelesaiDibaca.innerHTML += `<article class="book_item">
                                                    <h3>${data.title}</h3>
                                                    <p>Penulis: ${data.author}</p>
                                                    <p>Tahun: ${data.year}</p>
                                                    
                                                    <div class="action">
                                                      <button class="green" data-id=${data.id}>Tandai belum selesai</button>
                                                      <button class="red" data-id=${data.id}>Hapus buku</button>
                                                    </div>
                                                  </article>`
            }
        })
    }else{
        rakBukuBelumSelesaiDibaca.innerHTML = `<p>Data Buku Kosong!</p>`;
        rakBukuSelesaiDibaca.innerHTML = `<p>Data Buku Kosong!</p>`;
    }
}

const getDataBuku = ()=>{
        let localStorageSelesaiDibaca = localStorage.getItem(kunciLokalBuku);
        let JSONconvert = JSON.parse(localStorageSelesaiDibaca);
        return JSONconvert;
}

const successAlert = (e)=>{
    Swal.fire({
        icon: 'success',
        title: e,
        showConfirmButton: false,
        timer: 1500
    })
}

const warningAlert = (e)=>{
    Swal.fire({
        confirmButtonColor: '#6495EDFF',
        icon: 'warning',
        title: 'Ooh..',
        text: e
    })
}

const errorAlert = (e)=>{
    Swal.fire({
        confirmButtonColor: '#6495EDFF',
        icon: 'error',
        title: 'Oops... Something went wrong',
        text: e,
    })
}





document.addEventListener('DOMContentLoaded',()=>{
    if(typeof Storage !== undefined){
        if(localStorage.getItem(kunciLokalBuku) === null) {
         
            localStorage.setItem(kunciLokalBuku, '[]');
        }
    }else{
        alert('maaf anda tidak bisa menggunakan aplikasi ini.');
        alert('Browser ANDA tidak mendukung STORAGE local maupun session!');
    }
    updateWithoutRefresh();
})



selesaiDibaca.addEventListener('click',()=>{
    if(selesaiDibaca.checked){
        buttonText.innerText = 'Selesai dibaca';
    }else{
        buttonText.innerText = 'Belum selesai dibaca';
    }
});



tombolMasukkanRak.addEventListener('click',()=>{
    const judulBukuValue = judulBuku.value;
    const penulisBukuValue = penulisBuku.value;
    const tahunBukuValue = tahunBuku.value;
    const validasi= /^[a-zA-Z0-9\s]+$/;
    const yearValidation = /^\d{1,4}$/;


    let validasiChecker = true;
    if (!validasi.test(judulBukuValue)){
        warningAlert('Judul buku hanya boleh huruf, angka, dan spasi saja!')
        validasiChecker = false;

    }else if(!validasi.test(penulisBukuValue)){
        warningAlert('Penulis buku hanya boleh huruf, angka, dan spasi saja!')
        validasiChecker = false;

    }else if(!yearValidation.test(tahunBukuValue)){
        warningAlert('Tahun buku hanya boleh angka saja! dengan maksimal 4 angka')
        validasiChecker = false;
    }

    if(validasiChecker){
        const JSONconvert = getDataBuku();

        if(JSONconvert.some(data => data.title.toLowerCase() === judulBukuValue.toLowerCase())){
            errorAlert('Data buku sudah ada di dalam list!')
        }else{
            if(selesaiDibaca.checked){
                const inputDataObjectString = {
                    id : uuid(),
                    title : judulBukuValue,
                    author : penulisBukuValue,
                    year : tahunBukuValue,
                    isComplete : true
                }
                JSONconvert.push(inputDataObjectString);
                try{
                    localStorage.setItem(kunciLokalBuku, JSON.stringify(JSONconvert));
                    successAlert('Buku telah dimasukkan!');
                    updateWithoutRefresh();
                }catch (e) {
                    // dialog feedback jika terjadi kesalahan input buku
                    errorAlert(e.message)
                }
            }else{
                const inputDataObjectString = {
                    id : uuid(),
                    title : judulBukuValue,
                    author : penulisBukuValue,
                    year : tahunBukuValue,
                    isComplete : false
                }
                JSONconvert.push(inputDataObjectString);

                try{
                    localStorage.setItem(kunciLokalBuku, JSON.stringify(JSONconvert));
                    successAlert('Buku telah dimasukkan!');
                    updateWithoutRefresh();
                }catch (e) {
                    errorAlert(e.message);
                }
            }

            judulBuku.value = '';
            penulisBuku.value = '';
            tahunBuku.value = '';
        }
    }
})



document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('red')){
        const JSONconvert = getDataBuku();
        const dataId = e.target.getAttribute('data-id');

        if(JSONconvert.length > 0){
            const filterData = JSONconvert.filter(data => data.id !== dataId);
            Swal.fire({
                title: 'Apakah kamu yakin?',
                text: "kamu tidak akan bisa mengembalikan buku ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#6495EDFF',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, HAPUS!',
                cancelButtonText : 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        try{
                            successAlert('Buku berhasil dihapus');
                            localStorage.setItem(kunciLokalBuku, JSON.stringify(filterData));
                            updateWithoutRefresh();
                        }catch(e){
                            errorAlert(e.message);
                        }
                    }
                })
        }
    }else if(e.target.classList.contains('green')){
        const dataId = e.target.getAttribute('data-id');
        const JSONconvert = getDataBuku();

        if(JSONconvert.length > 0){
            JSONconvert.map((data)=>{
                if(data.id === dataId){ 
                    if (data.isComplete === true){
                        data.isComplete = false;
                        Swal.fire({
                        title: 'Apakah kamu yakin?',
                        text: "kamu akan menandai buku ini belum selesai dibaca",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#6495EDFF',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ya, Tandai!',
                        cancelButtonText : 'Batal'
                    }).then((result) => {
                            if (result.isConfirmed) {
                                try{
                                    localStorage.setItem(kunciLokalBuku, JSON.stringify(JSONconvert));
                                    successAlert('Buku berhasil ditandai belum selesai!');
                                    updateWithoutRefresh();
                                }catch(e){
                                    errorAlert(e.message);
                                }
                            }
                        })
                    }else{
                        data.isComplete = true; 
                        Swal.fire({
                            title: 'Apakah kamu yakin?',
                            text: "kamu akan menandai buku ini selesai dibaca",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#6495EDFF',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ya, Tandai!',
                            cancelButtonText : 'Batal'
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                try{
                                    localStorage.setItem(kunciLokalBuku, JSON.stringify(JSONconvert));
                                    successAlert('Buku berhasil ditandai selesai!');
                                    updateWithoutRefresh();
                                }catch(e){
                                    errorAlert(e.message);
                                }
                            }
                        })
                    }
                }
            })
        }
    }
})



searchInput.addEventListener('input',()=>{
    const searchInputValue = searchInput.value
    if(searchInputValue !== ''){
        updateOnSearch(searchInputValue);
    }else{
        updateWithoutRefresh();
    }
})
