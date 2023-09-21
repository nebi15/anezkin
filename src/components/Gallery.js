import { useEffect, useState } from "react";
import "./Gallery.css"
import { storage } from '../config/firebase';
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';
import { Menu } from "./Menu";
import AnimatedFeet from "./NotesComponents/AnimatedFeet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faClose, faDeleteLeft, faUpload } from '@fortawesome/free-solid-svg-icons';





export const Gallery = () => {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    //zvětšení fotky
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);




    const imageListRef = ref(storage, "projectFiles/")
    const uploadImage = async () => {
        if (!imageUpload) return;
        const imageRef = ref(storage, `projectFiles/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                getMetadata(snapshot.ref).then((metadata) => {

                    const uploadDate = new Date(metadata.timeCreated);

                    // Aktualizujeme metadatové informace, přidáme popisek


                    setImageList((prev) => [...prev, {
                        url,
                        uploadDate,
                    }]);
                    setImagePreview(null);

                }).catch((error) => {
                    console.error("Chyba při aktualizaci metadat ve Firestore:", error);
                });
            });
        });

    };


    useEffect(() => {
        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(imageUpload);
        }
    }, [imageUpload]);

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {

                    getMetadata(item).then((metadata) => {
                        // Získání data přidání obrázku
                        const uploadDate = new Date(metadata.timeCreated);


                        setImageList((prev) => [...prev,
                        {
                            url,
                            uploadDate,
                        },
                        ]);
                    });
                });
            });
        });

    }, []);

    function formatUploadDate(uploadDate) {
        const options = { day: 'numeric', month: '2-digit', year: 'numeric' };
        return uploadDate.toLocaleDateString(undefined, options).replace(/ /g, '');
    }

    function handleImageClick(imageUrl, index) {
        setSelectedImage(imageUrl);
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setSelectedImage(null);
        setIsModalOpen(false);
        setImagePreview(null);
    }

    function handleNextImage() {
        if (currentImageIndex < imageList.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    function handlePrevImage() {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }

    const deleteImage = (index) => {
        const imageToDelete = imageList[index]; // Získáme informace o obrázku podle indexu
        const imageUrlToDelete = imageToDelete.url; // Získáme URL obrázku

        // Získáme referenci na konkrétní soubor v úložišti
        const imageRefToDelete = ref(storage, imageUrlToDelete);

        // Smazání souboru z úložiště
        deleteObject(imageRefToDelete)
            .then(() => {
                console.log(`Obrázek byl úspěšně smazán z úložiště.`);
                // Po smazání z úložiště můžete také smazat obrázek z galerie
                const updatedImageList = [...imageList];
                updatedImageList.splice(index, 1);
                setImageList(updatedImageList);
            })
            .catch((error) => {
                console.error(`Chyba při mazání obrázku z úložiště:`, error);
            });
    };

    return (
        <div>
            <h1>Anežka jak jde čas</h1>
            <input type="file"
                onChange={(e) => setImageUpload(e.target.files[0])}
                className="file-input-button"
            />
            {imagePreview && <img className="image-preview" src={imagePreview} alt="Náhled obrázku" />}

            <button className="Upload-button" onClick={uploadImage}><FontAwesomeIcon icon={faUpload} /></button>

            <AnimatedFeet />

            <div className="gallery">
                
                {imageList.map((image, index) => {
                    const { url, uploadDate } = image;

                    if (!uploadDate || !(uploadDate instanceof Date)) {
                        return null; // Pokud nejsou metadatové informace správně definované, neprovádíme žádný render.
                    }

                    return (
                        <figure className={`photo ${index % 3 === 0 ? 'photo__plat' : ''}`} data-cert="gold" key={v4()}
                            onClick={() => handleImageClick(url, index)}
                        >
                            <a href="#">
                                <img src={url} alt="" className="photo-img" />
                            </a>
                            <figcaption>
                                <span className="photo__year">{formatUploadDate(uploadDate)}
                                    <button className="close-button" onClick={() => deleteImage(index)}><FontAwesomeIcon icon={faDeleteLeft} /></button>
                                </span>
                            </figcaption>

                        </figure>
                    )
                })}
                {isModalOpen && (
                    <div className="modal">
                        <button className="nav-button prev-button" onClick={handlePrevImage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <div className="modal-content">
                            
                            <div className="image-container">
                            <img src={imageList[currentImageIndex]?.url} alt="" />
                                <button className="close-button" onClick={handleCloseModal}><FontAwesomeIcon icon={faClose} /></button>
                            </div>
                            
                            
                        </div>
                        <button className="nav-button next-button" onClick={handleNextImage}><FontAwesomeIcon icon={faArrowRight} /></button>
                        
                    </div>
                )}


            </div>
        </div>
    );

};
