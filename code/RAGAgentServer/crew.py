from crewai import Crew
from agents import CybersecurityResearchAgents
from tasks import CybersecurityResearchTasks

class CybersecurityResearchCrew:
    def __init__(self, job_id: str):
        self.job_id = job_id
        self.crew = None
        self.agents = CybersecurityResearchAgents()
        self.tasks = CybersecurityResearchTasks(job_id=self.job_id)

    def run(self, question: str):
        # Initialize agents
        researcher = self.agents.cybersecurity_researcher()
        manager = self.agents.research_manager(question)

        # Create tasks
        cybersecurity_research_tasks = [
            self.tasks.cyberSecurity_research(researcher, question)
        ]

        manage_research_task = self.tasks.manage_research(
            manager, question, cybersecurity_research_tasks)

        # Create and run the crew
        crew = Crew(
            agents=[manager,researcher],
            tasks=[*cybersecurity_research_tasks, manage_research_task],
            verbose=True
        )

        try:
            result = crew.kickoff()
        except Exception as e:
            print(f"An error occurred while running the crew: {e}")
            result = None
        
        return result