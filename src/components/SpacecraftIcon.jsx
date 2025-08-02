import React from "react";
import styles from "../pages/PlanetsPage.module.css";

const SpacecraftIcon = ({ ship, onClick, isSelected }) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.shipContainer} ${isSelected ? styles.shipSelected : ""}`}
        >
            <img
                src={
                    ship.pictureUrl ??
                    "https://upload.wikimedia.org/wikipedia/commons/0/03/SpaceX_Dragon_2.0.png"
                }
                alt={ship.name}
                className={styles.shipImage}
                title={ship.name}
            />
        </div>
    );
};

export default SpacecraftIcon;