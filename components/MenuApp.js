import Link from 'next/Link'
import { useRouter } from 'next/router'
import styles from '@styles/MenuApp.module.css'
import { ROUTES } from '@constants/index'

const MenuApp = () => {
    const router = useRouter();

    const {activeLink} = styles;
    return (
        <div className={styles.menuApp}>
            <ul className={styles.listGroup}>
                {ROUTES.map(({title, path}) => (
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