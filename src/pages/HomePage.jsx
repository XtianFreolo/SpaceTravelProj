
import styles from "./HomePage.module.css";

function HomePage() {
    return (
        <div className={styles.container}>
            <h1>Welcome to Xtian's Space station mate</h1>

            <p className={styles.box}>

                Think of this as your Space 7-11
                Explore the universe with us!
                Here we have everything you need for your
                intergalactic journey. You can rent Spaceships
                and buy supplies for your trip.
                You can also check out the planets.
                We have a wide range of planets to explore,
                all in the Planet section of the app.
            </p>
            <br></br>

            <p className={styles.box}>

                <strong>Note:</strong>
                If you want to rent a spaceship, Please go
                to the Spaceship Hangar and fill out a form
                to request a spaceship.
                Once you submit the form, our team will review
                and see if we can give you the ship. Its best if you send us
                a picture of the ship so that we can retrieve it
                as exact as possible.
            </p>
            <br></br>

            <p className={styles.box}>

                <strong>Note:</strong>
                To explore a planet, click the planet
                you want to explore at our planet section and
                when the planet border goes green, thats a sign
                for your spaceship to land, click your spaceship
                that you want to go to the planet. Once both Planet and
                Ship are highlighted, click the ship again to confirm everything
                and the ship will travel to the Desired planet.
            </p>


        </div>
    );
}


export default HomePage;