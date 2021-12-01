import Link from 'next/Link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import styles from '@styles/MenuApp.module.css'

const MenuApp = () => {
    const router = useRouter();
    const menu = [
        { title: 'Accueil', path: '/' },
        { title: 'Connexion', path: '/login' },
    ];

    return (
        <div className={styles.menuApp}>
            <ul className={styles.listGroup}>
                {menu.map(({title, path}) => (
                <li 
                    key={`${title}${path}`}
                    className={classNames({activeLink: router.pathname === path})}
                >
                        <Link href={path}>
                            <a>{title}</a>
                        </Link>
                    </li>))}
            </ul>
        </div>
    )
}

export default MenuApp;