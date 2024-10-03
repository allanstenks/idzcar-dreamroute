import React, { useEffect, useRef, useState } from "react";
import "./idzFileUpload.scss"
import { Icon } from "@iconify/react";

function IdzFileUpload({ multiple, handleUpload = '', handleDynamicUpload = '', index = '', field = '', currentFile = '', title = '', subtitle = '', angulo }) {

    const apiUrl = `https://api.idzcar.com.br`
    const additionalAttributes = multiple ? { multiple: true } : {};

    function getBase64Image(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const [files, setFiles] = useState('')
    const [thumbs, setThumbs] = useState([])

    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault()
    };

    const handleDrop = (event) => {
        event.preventDefault()
        setFiles(event.dataTransfer.files)
    }

    const handleDropUpdate = async (event) => {
        event.preventDefault()

        const currentThumbs = [...thumbs]

        let tmp_files = []
        let index = 0
        for (let file of event.dataTransfer.files) {
            let base64 = await getBase64Image(file)
            tmp_files.push({ src: base64, index: index });
            index += 1;
        }

        const lastThumbs = [...thumbs]
        tmp_files.forEach((data, index) => {
            lastThumbs.push(data)
        })

        setThumbs(lastThumbs)

        if (handleDynamicUpload != '    ') {
            handleDynamicUpload(lastThumbs[0].src, index, field)
        } else {
            if (multiple && handleUpload) {
                handleUpload(lastThumbs, "destaque")
            } else if (handleUpload) {
                handleUpload(lastThumbs[0].src)
            }
        }
    }

    const updateThumb = async (files) => {
        let thumbs_tmp = []

        if (multiple) {
            let index = 0
            for (let file of files) {
                let img = await getBase64Image(file)
                thumbs_tmp.push({ src: img, index: index })
                index += 1
            }
        } else {
            for (let file of files) {
                let img = await getBase64Image(file)
                thumbs_tmp.push({ src: img })
            }
        }

        const lastThumbs = [...thumbs]
        thumbs_tmp.forEach((data, index) => {
            lastThumbs.push(data)
        })
        setThumbs(lastThumbs)

        if (handleDynamicUpload != '') {
            handleDynamicUpload(lastThumbs[0].src, index, field)
        } else {
            if (multiple && handleUpload) {
                handleUpload(lastThumbs, "destaque")
            } else if (handleUpload) {
                handleUpload(lastThumbs[0].src)
            }
        }
    }

    const handleThumb = async (files) => {
        let thumbs_tmp = []

        if (multiple) {
            let index = 0
            for (let file of files) {
                let img = await getBase64Image(file)
                thumbs_tmp.push({ src: img, index: index })
                index += 1
            }
        } else {
            for (let file of files) {
                let img = await getBase64Image(file)
                thumbs_tmp.push({ src: img })
            }
        }

        setThumbs(thumbs_tmp)

        if (handleDynamicUpload != '') {
            handleDynamicUpload(thumbs_tmp[0].src, index, field)
        } else {
            if (multiple && handleUpload) {
                handleUpload(thumbs_tmp, "destaque")
            } else if (handleUpload) {
                handleUpload(thumbs_tmp[0].src)
            }
        }
    }

    const handleRemove = (index) => {
        const currentThumbs = [...thumbs]
        currentThumbs.splice(index, 1);
        setThumbs(currentThumbs)

        if (handleDynamicUpload != '') {
            handleDynamicUpload(currentThumbs[0].src, index, field)
        } else {
            if (multiple && handleUpload) {
                handleUpload(currentThumbs, "destaque")
            } else if (handleUpload) {
                handleUpload(currentThumbs[0].src)
            }
        }
    }

    useEffect(() => {
        if (files) {
            handleThumb(files)
        }
    }, [files])

    useEffect(() => {
        if (multiple && currentFile) {
            let tmp_list = []
            currentFile.forEach((item, index) => {
                if (item.id) {
                    tmp_list.push({ src: item.imagem, index: index, id: item.id })
                } else {
                    tmp_list.push({ src: item.imagem, index: index })
                }
            })
            setThumbs(tmp_list)
        } else if (currentFile) {
            setThumbs([{ src: currentFile }])
        }
    }, [currentFile])

    if (files || currentFile) return (
        <>
            <div className={`uploads ${multiple ? "multiple-with-files" : ""}`}>
                {!multiple && <ul>
                    {thumbs.map((file, idx) =>
                        <li key={idx} className="picture" style={{ background: `url(${file.src.includes("base64") ? `${file.src}` : `${apiUrl}${file.src}`}) no-repeat center / cover` }}></li>
                    )}
                </ul>
                }


                {!multiple &&
                    <div>
                        <button className="delete-area" onClick={() => {
                            setFiles('')
                            if (handleDynamicUpload != '') {
                                handleDynamicUpload('', index, field)
                            } else {
                                if (handleUpload) {
                                    handleUpload('')
                                }
                            }
                        }}>
                            <i><Icon icon="mdi:trash" ></Icon></i>
                            <strong>EXCLUIR</strong>
                        </button>
                        {/* <button onClick={handleUpload}>Send</button> */}
                    </div>
                }
                {
                    multiple && (
                        <div
                            className="dropzone multiple-with-files files-setted"
                            onDragOver={handleDragOver}
                            onDrop={handleDropUpdate}
                        >
                            <i><Icon className="icons" icon="ph:upload-fill" /></i>
                            <span>Arraste as fotos ou procure nos arquivos</span>
                            <p>Arquivos permitidos: .jpeg, .png</p>
                            <input
                                type="file"
                                accept="image/*"
                                {...additionalAttributes}
                                onChange={(event) => updateThumb(event.target.files)}
                                hidden
                                ref={inputRef}
                            ></input>
                            <button onClick={() => inputRef.current.click()}></button>
                        </div>
                    )
                }
            </div >
            {multiple &&
                <div className="preview-multiple">
                    <ul>
                        {thumbs.map((file, idx) =>
                            <li key={idx} onClick={() => { handleRemove(idx) }}>
                                <div className="picture" style={{ background: `url(${file.src.includes("base64") ? `${file.src}` : `${apiUrl}${file.src}`}) no-repeat center / cover` }}>
                                    <div className="delete-area">
                                        <i><Icon icon="mdi:trash" ></Icon></i>
                                        <strong>EXCLUIR</strong>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            }

        </>
    )

    return (
        <>
            {(!files && !multiple) && (
                <div
                    className="dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {(angulo == "frente") && ( 
                        <>
                            <div className={`img ${angulo}`}></div><h6>visão frente</h6>
                        </> 
                    )}{(angulo == "lateral") && ( 
                        <>
                            <div className={`img ${angulo}`}></div><h6>visão lateral</h6>
                        </> 
                    )}{(angulo == "traseira") && ( 
                        <>
                            <div className={`img ${angulo}`}></div><h6>visão traseira</h6>
                        </> 
                    )}{(angulo == "interior") && ( 
                        <>
                            <div className={`img ${angulo}`}></div><h6>visão interior</h6>
                        </> 
                    )}
                    <i><Icon className="icons" icon="ph:upload-fill" /></i>
                    <span>{title ? title : "Carregar foto"}</span>
                    <p>{subtitle ? subtitle : "Arquivos permitidos: .jpeg, .png"}</p>
                    <input
                        type="file"
                        accept="image/*"
                        {...additionalAttributes}
                        onChange={(event) => setFiles(event.target.files)}
                        hidden
                        ref={inputRef}
                    ></input>
                    <button onClick={() => inputRef.current.click()}></button>
                </div>
            )}
            {
                multiple && (
                    <div
                        className={"dropzone multiple-with-files"}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <i><Icon className="icons" icon="ph:upload-fill" /></i>
                        <span>Arraste as fotos ou procure nos arquivos</span>
                        <p>Arquivos permitidos: .jpeg, .png</p>
                        <input
                            type="file"
                            accept="image/*"
                            {...additionalAttributes}
                            onChange={(event) => setFiles(event.target.files)}
                            hidden
                            ref={inputRef}
                        ></input>
                        <button onClick={() => inputRef.current.click()}></button>
                    </div>
                )
            }
        </>
    )
}

export default IdzFileUpload