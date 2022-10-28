// //get go
let heading = document.querySelector('header h2')
let playlist =document.querySelector(".playlist")
let cdMusic =document.querySelector('.cd-music')
let audio =document.querySelector('#audio')
let play=document.querySelector('.btn-play')
let player=document.querySelector('.player')
let progress=document.querySelector('.progress')
let nextBtn=document.querySelector('.btn-next')
let backwardBtn=document.querySelector('.btn-backward')
let repeatBtn=document.querySelector('.btn-repeat')
let randomBtn=document.querySelector('.btn-random')

let app ={
    currentIndex:0,
    isPlaying :false,
    isRandom:false,
    isRepeat:false,
    songs:[
        {
            name:"Still Live",
            singer:"Big Bang",
            source:"./asset/music/still live.mp3",
            ing:"./asset/img/stilllive.jpg"
        },
        {
            name:"Chờ Đợi Có Đáng Sợ",
            singer:"Andiez",
            source:"https://zingmp3.vn/bai-hat/Cho-Doi-Co-Dang-So-Andiez/ZZ9IAEC8.html",
            ing:"./asset/img/andiezz.jpg"
        },
        {
            name:"Giản Đơn",
            singer:"NHA x Ry2c",
            source:"./asset/music/giản đơn.mp3",
            ing:"./asset/img/giandon.jpg"
        },
        {
            name:"Heartbreak Melody",
            singer:"Hospital Playlist",
            source:"./asset/music/hp04.mp3",
            ing:"./asset/img/hp04.jpg"
        },
        {
            name:"Cheer up",
            singer:"Hospital Playlist",
            source:"./asset/music/cheerup.mp3",
            ing:"./asset/img/hp06.jpg"
        },
        {
            name:"Lonely",
            singer:"Nana (BT remix)",
            source:"./asset/music/lonely.mp3",
            ing:"./asset/img/lonely.jpg"
        },
        {
            name:"Mặt Mộc",
            singer:"Phạm Nguyên Ngọc x VAnh x Ân Nhi",
            source:"./asset/music/matmoc.mp3",
            ing:"./asset/img/matmoc.jpg"
        },
        {
            name:"Đi theo bóng mặt trời",
            singer:"Đen Vâu ft.Tăng Ngân Hà",
            source:"./asset/music/đi theo bóng mặt trời.mp3",
            ing:"./asset/img/den.jpg"
        },
        {
            name:"Đi Về Nhà",
            singer:"Đen Vâu x Justatee",
            source:"./asset/music/đi về nhà.mp3",
            ing:"./asset/img/divenha.jpg"
        },
        {
            name:"DTAT",
            singer:"NHA, Kim Nguyễn",
            source:"./asset/music/dtat.mp3",
            ing:"./asset/img/dtat.jpg"
        },
        {
            name:"HaNoi and U",
            singer:"Đing Đức Anh",
            source:"./asset/music/Hnoi and U.mp3",
            ing:"./asset/img/hanoi.jpg"
        },
        {
            name:"Tết Đong Đầy",
            singer:"Kay Trần x Nguyễn Khoa x Duck V",
            source:"./asset/music/tết đong đầy.mp3",
            ing:"./asset/img/tetdongday.jpg"
        },
    ],
    displayFirstSong:function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    
    render: function(){
        let htmls =this.songs.map((song, index) =>{
            return`
            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                <div class="music"
                    style="background-image: url('${song.ing}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
        })
        playlist.innerHTML=htmls.join('')
    },
    handel:function(){
        let _this = this
        let cd =document.querySelector('.cd')
        let cdWidth = cd.offsetWidth
        // quay đĩa cd
        
        let cdRotate=cdMusic.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration:300000,
            interations:Infinity
        })
        cdRotate.pause()
        // xử lý phần thu phóg của cd
        document.onscroll =function(){
            let scrollTop = document.documentElement.scrollTop
            let newWidth =cdWidth - scrollTop
            if(newWidth>0){
                 cd.style.width = newWidth +'px'
            } else {
                cd.style.width = 0
            }
            cd.style.opacity=newWidth / cdWidth
        }
        //xử lý play/pause nhạc
        play.onclick=function(){
           if(_this.isPlaying){
                audio.pause()
           } else{
                audio.play() 
           }
        }
        audio.onplay=function(){
            _this.isPlaying=true
            player.classList.add('playing')
            cdRotate.play()
        }
        audio.onpause=function(){
            _this.isPlaying=false
            player.classList.remove('playing')
            cdRotate.pause()
        }
        //thay đổi tiến độ bài hát
        audio.ontimeupdate =function(){
            if(audio.duration){
                let progressPer = Math.floor(audio.currentTime / audio.duration *100)
                progress.value=progressPer
            }
        }
        //tua
        progress.onchange =function(e){
            let seekTime = audio.duration /100 * e.target.value
            audio.currentTime =seekTime
        }
        //xử lý next bài
        nextBtn.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()
                

            } else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            // audio.ontimeupdate()
            // progress.onchange()
            
        }
        //lùi bài
        backwardBtn.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()

            } else{
                _this.backwardSong()
            }
            audio.play()
            _this.render()
            // audio.ontimeupdate()
            // progress.onchange()
            
        }
        //random
        randomBtn.onclick=function(){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
            audio.play()
            // audio.ontimeupdate()
            // progress.onchange()
        }
        //repeat
        repeatBtn.onclick=function(){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            audio.play()
            // audio.ontimeupdate()
            // progress.onchange()
        }
        audio.onended =function(){
            if(_this.isRepeat){
                audio.play()
            } else if(_this.isRandom){
                _this.randomSong()
                audio.play()
            } else nextBtn.click()
            _this.render()
            
        }
        playlist.onclick=function(e){
            let songClick = e.target.closest('.song:not(.active)')
            if(songClick||e.target.closest('.option')){
                if(songClick){
                    _this.currentIndex=Number(songClick.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                    audio.ontimeupdate()
                    progress.onchange()
                }
            }
        }
    },
    loadCurrentSong:function(){
        heading.textContent =this.currentSong.name
        cdMusic.style.backgroundImage = `url('${this.currentSong.ing}')`
        audio.src = this.currentSong.source
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length){
            this.currentIndex =0
        }
        this.loadCurrentSong()
    },
    backwardSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex =this.songs.length-1
        }
        this.loadCurrentSong()
    },
    randomSong:function(){
        var newIndex
        do{
            newIndex= Math.floor(Math.random()* this.songs.length)
        } while(newIndex === this.currentIndex){
            this.currentIndex=newIndex
        }
        this.loadCurrentSong()
    },

    start: function(){
        this.displayFirstSong()
        this.loadCurrentSong()
        this.handel()
        this.render()
    }
};
app.start();

