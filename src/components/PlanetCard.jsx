import React from "react";
import SpacecraftIcon from "./SpacecraftIcon";
import styles from "../pages/PlanetsPage.module.css";

const PlanetCard = ({
    planet,
    isSelected,
    hasShip,
    onPlanetClick,
    onShipClick,
    isShipSelected,
    setIsShipSelected
}) => {
    const cardClass = isSelected
        ? `${styles.planetCard} ${styles.selected}`
        : styles.planetCard;

    return (
        <div className={cardClass} onClick={onPlanetClick}>
            <img src={planet.pictureUrl} alt={planet.name} className={styles.planetImage} />
            <div className={styles.info}>
                <h3>{planet.name}</h3>
                <p>Population: {planet.currentPopulation.toLocaleString()}</p>
            </div>
            {hasShip && (
                <SpacecraftIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsShipSelected(true);
                        onShipClick();
                    }}
                    isSelected={isShipSelected}
                />
            )}
        </div>
    );
};

export default PlanetCard;