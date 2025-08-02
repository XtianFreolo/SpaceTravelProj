import React from "react";
import styles from "../pages/PlanetsPage.module.css";

const SpacecraftIcon = ({ onClick, isSelected }) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.shipContainer} ${isSelected ? styles.shipSelected : ""}`}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/03/SpaceX_Dragon_2.0.png"
                alt="Spacecraft"
                className={styles.shipImage}
            />
        </div>
    );
};

export default SpacecraftIcon;