import React, { useEffect, useState } from "react";
import SpaceTravelMockApi from "../services/SpaceTravelMockApi";
import PlanetCard from "../components/PlanetCard";


const PlanetsPage = () => {
    const [planets, setPlanets] = useState([]);
    const [spacecraft, setSpacecraft] = useState([]);
    const [selectedPlanetId, setSelectedPlanetId] = useState(null);
    const [isShipSelected, setIsShipSelected] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const planetsRes = await SpaceTravelMockApi.getPlanets();
            const shipsRes = await SpaceTravelMockApi.getSpacecrafts();
            if (!planetsRes.isError && !shipsRes.isError) {
                setPlanets(planetsRes.data);
                setSpacecraft(shipsRes.data[0]);
            }
        };
        fetchData();
    }, []);


    const handlePlanetClick = (planetId) => {
        setSelectedPlanetId(planetId);
        setIsShipSelected(false);
    };

    const handleShipClick = async () => {
        if (selectedPlanetId == null || spacecraft == null) return;

        if (spacecraft.currentLocation === selectedPlanetId) return;

        const res = await SpaceTravelMockApi.sendSpacecraftToPlanet({
            spacecraftId: spacecraft.id,
            targetPlanetId: selectedPlanetId,
        });

        if (!res.isError) {

            const planetRes = await SpaceTravelMockApi.getPlanets();
            const updatedShip = await SpaceTravelMockApi.getSpacecraftById({ id: spacecraft.id });
            setPlanets(planetRes.data);
            setSpacecraft(updatedShip.data);
            setSelectedPlanetId(null);
            setIsShipSelected(false);
        } else {
            alert(res.data.message || "Sorry, Spaceship needs an oilchange.. wtf");
        }


    };


    return (
        <div className={styles.grid}>
            {planets.map((planet) => (
                <PlanetCard
                    key={planet.id}
                    planet={planet}
                    isSelected={selectedPlanetId === planet.id}
                    hasShip={spacecraft?.currentLocation === planet.id}
                    onPlanetClick={() => handlePlanetClick(planet.id)}
                    onShipClick={handleShipClick}
                    isShipSelected={isShipSelected}
                    setIsShipSelected={setIsShipSelected}
                />
            ))}

        </div>
    );

};



export default PlanetsPage;
