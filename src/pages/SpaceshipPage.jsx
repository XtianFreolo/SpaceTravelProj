import React, { useState, useEffect } from "react";
import SpaceTravelApi from "../api/SpaceTravelApi";


const SpaceshipPage = () => {
    const [spaceships, setSpaceships] = useState([]);
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");



    const fetchSpaceships = async () => {
        const res = await SpaceTravelApi.getSpaceCrafts();
        if (!res.isError) {
            setSpaceships(res.data);
        } else {
            console.error("Error fetching spacecrafts:", res.data);
        }

    };

    useEffect(() => {
        fetchSpaceships();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await SpaceTravelApi.buildSpaceCraft({
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
            alert("Enjoy the new spacecraft Gov'na!! U break it u pay!");
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
        <div className={"p-4"}>
            <h1 className="text-2xl font-bold mb-4">Spaceship Hangar</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">

                <input
                    type="text"
                    placeholder="Spaceship Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    className="block border p-2 w-full"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="block border p-2 w-full"
                />

                <input
                    type="text"
                    placeholder="Picture URL"
                    value={pictureUrl}
                    onChange={(e) => setPictureUrl(e.target.value)}
                    className="block border p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >

                    Create Spaceship
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-4">Available Spaceships</h2>
            <ul className="space-y-4">
                {spaceships.map((ship) => (
                    <li
                        key={ship.id}
                        className="border p-4 flex justify-between items-center"
                    >
                        <div>
                            <p>
                                <strong>{ship.name}</strong> - Capacity: {ship.capacity}
                            </p>
                            <p className="text-sm italic">{ship.description}</p>
                            {ship.pictureUrl && (
                                <img
                                    src={ship.pictureUrl}
                                    alt={ship.name}
                                    className="w-32 mt-2 rounded"
                                />

                            )}
                        </div>
                        <button
                            onClick={() => handleDelete(ship.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
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
