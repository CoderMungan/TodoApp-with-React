import React, { useEffect, useState } from 'react'


export default function TodoInput() {

    const [cache, setCache] = useState([])
    const [input, setInput] = useState("")

    // localStorage.setItem("todoList",JSON.stringify(cache))

    const girilenInput = (e) => {
        const gelenDeger = e.target.value
        setInput(gelenDeger)
    }

    let todolar = {
        id: Date.now(),
        content: input
    }


    const ekle = () => {
        setCache([...cache, todolar])
        localStorage.setItem("todoList", JSON.stringify([...cache, todolar]))
        setInput("")
    }


    const silme = (id) => {
        const onaylama = window.confirm("Silmeyi Onaylıyor musunuz?")
        if(onaylama){
            const silinmisData = cache.filter((veri) => veri.id !== id)
            localStorage.setItem("todoList",JSON.stringify(silinmisData))
            setCache(silinmisData)
        }else {
            return
        }
    }

    const degistirme = (id) => {
        const kullanicidanGelen = prompt("Kullanıcı yaz")
        const degisim = cache.find((data) => data.id === id)
        degisim.content = kullanicidanGelen
        const veri = cache.filter((veri) => veri)
        setCache(veri)
        localStorage.setItem("todoList", JSON.stringify(cache))
    }

    useEffect(() => {
        const localcagir = localStorage.getItem("todoList")
        if(localcagir){
            const parslama = JSON.parse(localcagir)
            setCache(parslama)
        }
    }, [])


    return (



        <>
            <input onChange={girilenInput} value={input} type="text" placeholder='Todonuzu Giriniz' />
            <button onClick={ekle}>Ekle</button>
            <ul>
                {cache.map((veriler) => {
                    return <li key={Math.floor(Math.random() * 10000000)}>{veriler.content}
                        <button onClick={() => silme(veriler.id)}>Sil</button>
                        <button onClick={() => degistirme(veriler.id)}>Değiştir</button>
                    </li>
                })}
            </ul>
        </>
    )
}
