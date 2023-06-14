class HackerEffectText{
    set_dom($dom){
        this.$dom = $dom;
        this.originalText = this.$dom.textContent;
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        this.flag = true;
        return this;
    }//set_dom

    init(){
        this.$dom.addEventListener('mouseover', this.on_mouse_over);
        this.$dom.addEventListener('mouseleave',this.on_mouse_leave);
    }//init

    on_mouse_over = e =>{
        if(!this.flag) return;
        this.flag = false;

        let count = 0;

        const interval = setInterval(()=>{
            const newStr = this.$dom.textContent.split('')
            .map((_,idx) => {
                if(idx < count){
                    return this.originalText[idx];
                }else if(_ == " "){
                    return _;
                }else{
                    return this.letters[this.get_random_idx()]
                }
            })
            .join('');
            this.$dom.textContent = newStr;
            count += 0.3;
            if(count >= this.originalText.length){
                this.flag = true;
                clearInterval(interval);
                this.on_mouse_leave();
            }
        },60);

    }//on_mouse_over

    get_random_idx(){
        return Math.floor(Math.random() * 36);
    }//get_random_idx

    on_mouse_leave = e =>{
        this.$dom.textContent = this.originalText;
    }//on_mouse_leave
}//HackerEffectText

/* ----------------------- */
const $$hefct = document.querySelectorAll('.hackerEffect');
$$hefct.forEach($hefct =>{
    new HackerEffectText()
    .set_dom($hefct)
    .init();
})