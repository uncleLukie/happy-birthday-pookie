// src/App.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import Confetti from 'react-confetti';
import './App.css';

Modal.setAppElement('#root'); // For accessibility

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const images = [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/4.jpg',
        '/images/5.jpg',
        '/images/6.jpg',
    ];

    useEffect(() => {
        // Update window dimensions on resize for confetti
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openModal = (src) => {
        setCurrentImage(src);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="app-container">
            <ReactPlayer
                url="https://www.youtube.com/watch?v=RgjUi098tQ4"
                playing={true}
                loop={true}
                width="0"
                height="0"
                config={{
                    youtube: {
                        playerVars: { autoplay: 1, controls: 0, showinfo: 0, mute: 0 },
                    },
                }}
                style={{ display: 'none' }}
            />

            <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
                numberOfPieces={300}
                recycle={true}
                gravity={0.1}
                run={true}
                colors={['#ff69b4', '#ffa07a', '#9ccfe7', '#ffffc2']}
            />

            <motion.h1
                className="birthday-title"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                🎉 Happy Birthday, Pookie! 🎉
            </motion.h1>

            <div className="slideshow">
                {images.map((src, index) => (
                    <motion.img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="slide-image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => openModal(src)}
                    />
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
            >
                <button className="close-button" onClick={closeModal}>
                    &times;
                </button>
                <img src={currentImage} alt="Enlarged" className="modal-image" />
            </Modal>

            <motion.p
                className="message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                You fill my life with sunshine and rainbows. Here's to more laughter, more adventures, and more love! 🌈💕
            </motion.p>
        </div>
    );
}

export default App;
