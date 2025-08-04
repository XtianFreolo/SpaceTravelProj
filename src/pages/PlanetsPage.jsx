import React, { useEffect, useState } from "react";
import SpaceTravelMockApi from "../services/SpaceTravelMockApi";
import PlanetCard from "../components/PlanetCard";
import styles from "./PlanetsPage.module.css";





const PlanetsPage = () => {
    const [planets, setPlanets] = useState([]);
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [selectedPlanetId, setSelectedPlanetId] = useState(null);
    const [selectedShipId, setSelectedShipId] = useState(null);

    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const planetsRes = await SpaceTravelMockApi.getPlanets();
            const shipsRes = await SpaceTravelMockApi.getSpacecrafts();
            if (!planetsRes.isError && !shipsRes.isError) {
                setPlanets(planetsRes.data);
                setSpacecrafts(shipsRes.data);
            }
        };

        fetchData();
    }, []);

    const handleShipClick = async (shipId) => {
        if (selectedPlanetId == null) return;


        const ship = spacecrafts.find((s) => s.id === shipId);
        if (!ship || ship.currentLocation === selectedPlanetId) return;


        // setLoading(true);

        const res = await SpaceTravelMockApi.sendSpacecraftToPlanet({
            spacecraftId: ship.id,
            targetPlanetId: selectedPlanetId,
        });

        if (!res.isError) {
            const planetsRes = await SpaceTravelMockApi.getPlanets();
            const shipsRes = await SpaceTravelMockApi.getSpacecrafts();
            setPlanets(planetsRes.data);
            setSpacecrafts(shipsRes.data);
            setSelectedPlanetId(null);
            setSelectedShipId(null);
        } else {
            alert(res.data.message || "Failed to move ship.");
        }

        // setLoading(false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.grid}>
                {planets.map((planet) => {
                    const shipsOnThisPlanet = spacecrafts.filter(
                        (ship) => ship.currentLocation === planet.id
                    );

                    return (
                        <PlanetCard
                            key={planet.id}
                            planet={planet}
                            isSelected={selectedPlanetId === planet.id}
                            onPlanetClick={() => {
                                setSelectedPlanetId(planet.id);
                                setSelectedShipId(null);
                            }}
                            ships={shipsOnThisPlanet}
                            selectedShipId={selectedShipId}
                            onShipSelect={setSelectedShipId}
                            onShipMove={handleShipClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PlanetsPage;