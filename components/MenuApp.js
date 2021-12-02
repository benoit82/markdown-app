import Link from 'next/Link'
import { useRouter } from 'next/router'
import styles from '@styles/MenuApp.module.css'

const MenuApp = () => {
    const router = useRouter();
    const menu = [
        { title: 'Accueil', path: '/' },
        { title: 'Connexion', path: '/login' },
    ];

    const {activeLink} = styles;
    return (
        <div className={styles.menuApp}>
            <ul className={styles.listGroup}>
                {menu.map(({title, path}) => (
                <li key={`${title}${path}`}>
                        <Link href={path}>
                            <a className={`${ router.pathname === path ? 'activeLink' : '' }`}>
                                {title}
                            </a>
                        </Link>
                    </li>))}
            </ul>
        </div>
    )
}

export default MenuApp;