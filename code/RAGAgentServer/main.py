from crewai import Crew
from agents import CybersecurityResearchAgents
from crew import CybersecurityResearchCrew
from tasks import CybersecurityResearchTasks

def main():
    websites = [
        "https://www.cisa.gov/news-events/cybersecurity-advisories",
        "https://www.sans.org/blog/",
        "https://www.darkreading.com/ics-ot",
        "https://www.securityweek.com/category/ics-ot/",
        "https://www.cybersecuritynews.com/",
        "https://www.hackread.com/",
        "https://www.cyberscoop.com/",
        "https://www.infosecurity-magazine.com/",
        "https://krebsonsecurity.com/",
        "https://www.schneier.com/",
    ]

    crew = CybersecurityResearchCrew(websites)
    result = crew.run()

    # Save the result to a file
    with open('cybersecurity_threat_report.txt', 'w') as f:
        f.write(result)

    print("Cybersecurity threat report completed. Saved to 'cybersecurity_threat_report.txt'")

if __name__ == "__main__":
    main()