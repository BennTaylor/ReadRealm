# Project Report for ReadRealm
## Changes in Direction from Original Proposal
Initially, our vision for ReadRealm was to develop a platform resembling a social media interface like Twitter, focusing on a dynamic, interactive user experience for book discovery. However, during development, we shifted our approach towards a model more akin to Goodreads. This change primarily involved focusing on robust search and review functionalities rather than incorporating a recommendation system based on machine learning algorithms. The idea to model the interface after Twitter was replaced by a more traditional and straightforward book search and review interface, as we recognized the complexities involved in implementing a user-friendly yet feature-rich platform.

## Achievements and Limitations in Application Usefulness
The core functionality intended for ReadRealm was to enhance the user's ability to discover and research books comprehensively. We aimed to integrate a machine learning-based recommendation system that could analyze book descriptions and user reviews to suggest books. Unfortunately, due to the complexity and technical challenges involved in implementing such a system, this feature was not developed. Despite this, our application successfully implemented detailed book search capabilities and integrated reviews from Amazon, providing users with a wealth of information to make informed reading choices.

## Schema and Data Source Stability
The data schema and sources remained consistent throughout the project. We utilized two primary datasets: Amazon Book Reviews and Goodreads books. These datasets provided a robust foundation for our book and review data, ensuring a comprehensive database without requiring changes to our planned schema.

## Modifications to ER Diagram and Table Implementations
Initially, our ER diagram included a 'user-genre' table to support a recommendation system based on user preferences. This table was removed when we decided against implementing the recommendation system. The final design is more streamlined but lacks the capability for personalized book suggestions, reflecting our adjusted focus on search and review functionalities.

## Functionalities Added and Removed
We removed the planned recommendation system but enhanced the book discovery experience by leveraging existing reviews from Amazon and focusing on search capabilities by author and genre. These changes allowed us to provide users with powerful tools for finding books that match their interests, even without the advanced recommendation features we originally envisioned.

## Complementing the Application with Advanced Database Programs
ReadRealm relies heavily on a complex database structure to manage millions of reviews and extensive book data. Our application's effectiveness in providing detailed book information and reviews is directly tied to our database's capabilities, highlighting the importance of well-structured database programs in supporting our platform's functionality.

## Technical Challenges and Solutions
### Front-End and Back-End Integration:
We struggled with connecting the front-end and back-end components, particularly in deploying our application using Google Cloud Platform (GCP). We overcame this by investing time in learning GCP's deployment methodologies and troubleshooting integration issues.
### Data Collection and Integration:
Incorporating data from diverse sources posed significant challenges. We utilized Python scripts for data cleaning and integration, automating the process to handle large volumes of data efficiently.
### Many-to-Many Relationships in Database:
We encountered difficulties in handling many-to-many relationships. The solution was to implement join tables, which facilitated effective data management and query execution.
### Scalability and Performance Optimization:
As our database grew, we noticed performance issues due to the vast amount of data being processed. We optimized our SQL queries and implemented indexing to improve data retrieval times, ensuring a smooth user experience.
Future Improvements
Apart from refining the user interface, a significant area for future development would be the implementation of a machine learning-based recommendation system. This could dramatically enhance the personalized book discovery experience by analyzing user preferences and review patterns.

## Division of Labor and Teamwork
Our team managed the division of labor effectively, with each member focusing on their strengths. Regular team meetings ensured that everyone was aligned with the project's progress and challenges. When issues arose, collaborative problem-solving helped us stay on track and maintain productivity.






