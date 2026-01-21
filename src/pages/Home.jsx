import Button from "../components/Button"
function Home() {
    return (
    <main className="flex-grow">
        <section className="bg-gray-100 py-20 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to SmartBabyCare</h2>
            <p className="text-gray-600 mb-6">
                Build modern applications with React and Tailwind CSS
            </p>
            <Button nom="Ahmed"/>
            <Button nom="Ali"/>
            <Button nom="Fatima"/>
            <Button nom="Youssef"/>
        </section>
    </main>
    )
}
export default Home
    