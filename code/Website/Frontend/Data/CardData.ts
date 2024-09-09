export interface CardSchema {
    title: string;
    date: string;
    time: string;
    link: string;
    description: string;
    tags: string[];
}

export const CardData: CardSchema[] = [
    {
        title: "New Vulnerability Discovered in XYZ Software",
        date: "Jun 29",
        time: "2 min read",
        link: "https://example.com/article1",
        description: "A critical vulnerability has been found in XYZ software that could allow remote attackers to execute arbitrary code. This article provides details about the vulnerability and recommended mitigation steps.",
        tags: ["vulnerability", "XYZ software", "cybersecurity"],
    },
    {
        title: "Latest Cyber Attack Trends",
        date: "Jun 29",
        time: "3 min read",
        link: "https://example.com/article2",
        description: "Explore the latest trends in cyber attacks, including new attack vectors, techniques, and targeted industries. Stay updated on the evolving threat landscape.",
        tags: ["cyber attacks", "trends", "cybersecurity"],
    },
    {
        title: "Best Practices for Securing Web Applications",
        date: "Jun 29",
        time: "4 min read",
        link: "https://example.com/article3",
        description: "Learn about the best practices for securing web applications, including secure coding practices, input validation, and implementing proper authentication and authorization mechanisms.",
        tags: ["web applications", "security", "best practices", "cybersecurity"],
    },
    {
        title: "New Malware Variant Analysis",
        date: "Jun 29",
        time: "5 min read",
        link: "https://example.com/article4",
        description: "An in-depth analysis of a new malware variant recently discovered in the wild. Understand its behavior, propagation methods, and potential impact on systems.",
        tags: ["malware", "analysis", "cybersecurity"],
    },
    {
        title: "Securing Cloud Infrastructure",
        date: "Jun 29",
        time: "3 min read",
        link: "https://example.com/article5",
        description: "Discover the best practices for securing cloud infrastructure, including identity and access management, network security, and data encryption.",
        tags: ["cloud security", "best practices", "cybersecurity"],
    },
    {
        title: "Introduction to Threat Hunting",
        date: "Jun 29",
        time: "4 min read",
        link: "https://example.com/article6",
        description: "An introduction to threat hunting, a proactive security approach that focuses on identifying and mitigating threats before they cause damage. Learn about key concepts and techniques.",
        tags: ["threat hunting", "cybersecurity", "threat detection"],
    },
    {
        title: "Cybersecurity Career Paths",
        date: "Jun 29",
        time: "3 min read",
        link: "https://example.com/article7",
        description: "Explore different career paths in cybersecurity, from penetration testing and incident response to security engineering and security consulting. Find the right path for your interests and skills.",
        tags: ["cybersecurity", "careers", "career paths"],
    },
    {
        title: "Ransomware Prevention Strategies",
        date: "Jun 29",
        time: "5 min read",
        link: "https://example.com/article8",
        description: "Effective strategies for preventing ransomware attacks, including user awareness training, regular backups, network segmentation, and security software recommendations.",
        tags: ["ransomware", "prevention", "cybersecurity"],
    },
    {
        title: "The Role of AI in Cybersecurity",
        date: "Jun 29",
        time: "4 min read",
        link: "https://example.com/article9",
        description: "Explore the role of artificial intelligence in cybersecurity, including threat detection, incident response, and automated security analysis. Learn how AI is transforming the cybersecurity landscape.",
        tags: ["AI", "cybersecurity", "artificial intelligence"],
    },
    {
        title: "Common Social Engineering Techniques",
        date: "Jun 29",
        time: "3 min read",
        link: "https://example.com/article10",
        description: "An overview of common social engineering techniques used by cybercriminals to manipulate individuals and gain unauthorized access to systems. Learn how to recognize and prevent social engineering attacks.",
        tags: ["social engineering", "cybersecurity", "threats"],
    },
    {
        title: "The Importance of Incident Response",
        date: "Jun 29",
        time: "4 min read",
        link: "https://example.com/article11",
        description: "Understand the importance of incident response in cybersecurity, including the key phases of incident handling, incident response team roles, and best practices for effective incident response.",
        tags: ["incident response", "cybersecurity", "best practices"],
    },
    {
        title: "Cybersecurity Compliance Frameworks",
        date: "Jun 29",
        time: "3 min read",
        link: "https://example.com/article12",
        description: "An overview of cybersecurity compliance frameworks, including GDPR, HIPAA, PCI DSS, and NIST. Learn how these frameworks help organizations achieve regulatory compliance and improve security posture.",
        tags: ["compliance", "cybersecurity", "frameworks"],
    }
];

// Duplicate the CardData array twice
export const TripleCardData: CardSchema[] = [...CardData, ...CardData, ...CardData];
