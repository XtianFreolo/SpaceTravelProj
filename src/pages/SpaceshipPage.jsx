import React, { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import styles from "./SpaceshipPage.module.css";

const SpaceshipPage = () => {
    const [spaceships, setSpaceships] = useState([]);
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");

    const fetchSpaceships = async () => {
        const res = await SpaceTravelApi.getSpacecrafts();
        if (!res.isError) {
            setSpaceships(res.data);
        } else {
            console.error("Failed to fetch spacecrafts", res.data);
        }
    };

    useEffect(() => {
        fetchSpaceships();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await SpaceTravelApi.buildSpacecraft({
            name,
            capacity: parseInt(capacity),
            description,
            pictureUrl: pictureUrl || undefined,
        });

        if (!res.isError) {
            setName("");
            setCapacity("");
            setDescription("");
            setPictureUrl("");
            fetchSpaceships();
        } else {
            alert("Error creating spacecraft: " + res.data);
        }
    };

    const handleDelete = async (id) => {
        const res = await SpaceTravelApi.destroySpacecraftById({ id });
        if (!res.isError) {
            fetchSpaceships();
        } else {
            alert("Error deleting spacecraft: " + res.data);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Create a Spaceship</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Spaceship Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    className={styles.input}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={styles.textarea}
                />
                <input
                    type="text"
                    placeholder="Picture URL (optional)"
                    value={pictureUrl}
                    onChange={(e) => setPictureUrl(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Create Spaceship
                </button>
            </form>

            <h2 className={styles.heading}>My Spaceships</h2>
            <ul className={styles.spaceshipList}>

                {spaceships.map((ship) => (
                    <li key={ship.id} className={styles.spaceshipCard}>
                        {ship.pictureUrl && (
                            <img
                                src={ship.pictureUrl}
                                alt={ship.name}
                                className={styles.image}
                            />
                        )}

                        <div className={styles.shipInfo}>
                            <h3>{ship.name}</h3>
                            <p>Capacity: {ship.capacity}</p>
                            <p>{ship.description}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(ship.id)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpaceshipPage;