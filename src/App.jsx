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
    const [secretModalIsOpen, setSecretModalIsOpen] = useState(false);
    const [hintModalIsOpen, setHintModalIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [secretsFound, setSecretsFound] = useState(0);
    const [currentSecret, setCurrentSecret] = useState('');
    const [foundSecrets, setFoundSecrets] = useState({
        title: false,
        message: false,
        image: false,
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

    // Secret Handlers
    const handleTitleSecret = () => {
        if (!foundSecrets.title) {
            setSecretsFound(secretsFound + 1);
            setFoundSecrets({ ...foundSecrets, title: true });
            setCurrentSecret('title');
            setSecretModalIsOpen(true);
        }
    };

    const handleMessageSecret = () => {
        if (!foundSecrets.message) {
            setSecretsFound(secretsFound + 1);
            setFoundSecrets({ ...foundSecrets, message: true });
            setCurrentSecret('message');
            setSecretModalIsOpen(true);
        }
    };

    const handleImageSecret = () => {
        if (!foundSecrets.image) {
            setSecretsFound(secretsFound + 1);
            setFoundSecrets({ ...foundSecrets, image: true });
            setCurrentSecret('image');
            setSecretModalIsOpen(true);
        }
    };

    const closeSecretModal = () => {
        setSecretModalIsOpen(false);
    };

    // Hint Modal Handlers
    const openHintModal = () => {
        setHintModalIsOpen(true);
    };

    const closeHintModal = () => {
        setHintModalIsOpen(false);
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

            {/* Secret Counter and Hint Button */}
            <div className="header">
                <div className="secret-counter">
                    Secrets Found: {secretsFound}/3
                </div>
                <button className="hint-button" onClick={openHintModal}>
                    Need a Hint?
                </button>
            </div>

            <motion.h1
                className="birthday-title"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                onDoubleClick={handleTitleSecret} // Secret in title
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
                        onContextMenu={(e) => {
                            e.preventDefault();
                            if (index === 2) {
                                // Secret in the third image (index 2)
                                handleImageSecret();
                            }
                        }}
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

            {/* Secret Modal */}
            <Modal
                isOpen={secretModalIsOpen}
                onRequestClose={closeSecretModal}
                className="secret-modal"
                overlayClassName="secret-overlay"
            >
                <button className="close-button" onClick={closeSecretModal}>
                    &times;
                </button>
                <div className="secret-content">
                    {currentSecret === 'title' && (
                        <p>
                            Roses are red,<br />
                            Violets are blue,<br />
                            My world changed<br />
                            The day I met you.<br /><br />
                            Your smile lights up my days,<br />
                            Your laughter is my favorite melody,<br />
                            Together, let's dance through life,<br />
                            In perfect harmony. 🌹💙
                        </p>
                    )}
                    {currentSecret === 'message' && (
                        <p>
                            Every moment with you<br />
                            Is a treasure I hold dear.<br />
                            With you by my side,<br />
                            There's nothing I fear.<br /><br />
                            Here's to the memories we've made,<br />
                            And the ones yet to come.<br />
                            Happy Birthday, my love,<br />
                            You're my only one. 🎂❤️
                        </p>
                    )}
                    {currentSecret === 'image' && (
                        <p>
                            In your eyes, I see my future,<br />
                            In your arms, I find my home.<br />
                            With every beat of my heart,<br />
                            I know I'll never roam.<br /><br />
                            Your love is my guiding star,<br />
                            Shining bright and true.<br />
                            Love you endlessly, darling,<br />
                            Forever me and you. 😘🌟
                        </p>
                    )}
                </div>
            </Modal>

            {/* Hint Modal */}
            <Modal
                isOpen={hintModalIsOpen}
                onRequestClose={closeHintModal}
                className="hint-modal"
                overlayClassName="overlay"
            >
                <button className="close-button" onClick={closeHintModal}>
                    &times;
                </button>
                <div className="hint-content">
                    <h2>Hints to Find the Secrets</h2>
                    <ul>
                        <li>Secret 1: Sometimes double vision reveals hidden messages.</li>
                        <li>Secret 2: Hover over heartfelt words to uncover surprises.</li>
                        <li>Secret 3: A right-click might show you more than meets the eye.</li>
                    </ul>
                </div>
            </Modal>

            <motion.p
                className="message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onMouseEnter={handleMessageSecret} // Secret in message
            >
                You fill my life with sunshine and rainbows. Here's to more laughter, more adventures, and more love! 🌈💕
            </motion.p>
        </div>
    );
}

export default App;
