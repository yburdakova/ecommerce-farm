import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer id="contacts">
        <div className={styles.offer}>
            <h2 className={styles.offerText}>Company Logo <br/><span className="accent">For You With Love</span></h2>
            <div className={styles.socials}>
                <a href="https://twitter.com/" target="_blank" title="twitter" className={`${styles.socialButton} ${styles.twitter}`}></a>
                <a href="https://www.instagram.com/" target="_blank" title="instagram" className={`${styles.socialButton} ${styles.instagram}`}></a>
                <a href="https://www.facebook.com/" target="_blank" title="facebook" className={`${styles.socialButton} ${styles.facebook}`}></a>
            </div>
        </div>
        <div className={styles.contactInfo}>
            <h3>Contact us</h3>
            <div className={styles.contactContent}>
                <a href="https://maps.app.goo.gl/wLKcVo1QYT2VsVci7" target="_blank" title="Location" className={styles.contactItem}>
                    <div  className={`${styles.contactIcon} ${styles.address}`}></div>
                    <div>99999 Address., City, State</div>
                </a>
                <a href="tel:+19999999999" title="Phone number" className={styles.contactItem}>
                    <div  className={`${styles.contactIcon} ${styles.phone}`}></div>
                    <div>+1 (999) 999-9999</div>
                </a>
                <div className={styles.contactItem}>
                    <div  className={`${styles.contactIcon} ${styles.clock}`}></div>
                    <div>Mon-Sat: 9:00 AM - 23:00 PM</div>
                </div>
            </div>
            
        </div>
    </footer>
    )
}
