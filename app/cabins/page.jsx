import { list } from "postcss";
import Counter from "../components/Counter";

const Page = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const result = await users.json();
    return (
        <div>
            <h1>Cabins Page</h1>
            <ul>
                {result.map((item, key) => <li key={item.id}>{item.name}</li>)}
            </ul>
            <Counter />
        </div>

    )
}

export default Page;    