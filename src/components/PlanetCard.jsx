import React from "react";
import SpacecraftIcon from "./SpacecraftIcon";
import styles from "../pages/PlanetsPage.module.css";

const PlanetCard = ({
    planet,
    isSelected,
    onPlanetClick,
    ships,
    selectedShipId,
    onShipSelect,
    onShipMove
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
            <div className={styles.shipStack}>
                {ships.map((ship) => (
                    <SpacecraftIcon
                        key={ship.id}
                        ship={ship}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (selectedShipId === ship.id) {
                                onShipMove(ship.id); // move to selected planet
                            } else {
                                onShipSelect(ship.id); // select this ship
                            }
                        }}
                        isSelected={selectedShipId === ship.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlanetCard;