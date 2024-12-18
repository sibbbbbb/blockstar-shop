import Link from 'next/link';
import { items } from './items';

const ShopIndex: React.FC = () => {
    return (
        <div>
            <h1>Tienda</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Link legacyBehavior href={`/shop/${item.id}`}>
                        <a>
                                <h2>{item.name}</h2>
                                <p>Precio: ${item.price}</p>
                        </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShopIndex;