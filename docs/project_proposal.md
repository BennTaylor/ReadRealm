# ReadRealm
### Project Summary
For avid readers, navigating the vast landscape of available books can be overwhelming. ReadRealm simplifies the book discovery process, providing users with powerful search tools, comprehensive book details, and a supportive community to guide them towards their next great read.

Users can create profiles, outline their favorite genres, authors, and overall reading preferences. This data feeds into ReadRealm's unique recommendation system, which goes beyond simple ratings. The system analyzes shared interests and positive reviews among users, suggesting lesser-known titles that closely match a user's literary tastes. 

ReadRealm encourages a deeper understanding of books and fosters a love of reading.  Users explore detailed synopses, author information, publication details, and a wealth of reviews, including insights aggregated from Amazon and ReadRealm's own community.  The platform allows users to connect with other book enthusiasts, browse profiles, discover shared favorites, and expand their reading horizons within a vibrant online community. 


## Usefulness
Our application will allow users to better research books. This is particularly important in the realm of literature, as choosing a book to read is a larger commitment than a quick song listen or movie watch. A simple function would be the ability to search for a book and provide all the basic information related to the book. It will provide a stronger idea of what the book actually is to the user because we will integrate Amazon reviews into page. A more complex function would be allowing the user to submit a survey of some type of their interests and having a recommendation system that would find similar books to their interests. An example of this type of website would be good reads - the main way our website functions differently from good reads is by aggregating reviews from multiple sources. Additionally, while the site will be populated with reviews from larger sources, it will also maintain its own set of reviews attached to user profiles which creates a smaller community of reviews.

## Realness
Our application will pull information from two existing datasets. First, [Amazon Book Reviews](https://www.kaggle.com/datasets/mohamedbakhet/amazon-books-reviews) - This dataset contains two tables, one for reviews and one for books (both in CSV format). Each review (3 million in total) contains information such as book title, ISBN, rating, and helpfulness, as well as a summary of and the actual content of the review. The second table contains useful information for each of the 200,000 books in the system: title, description, author(s), cover, genres, and more. The other dataset we will be using, [Goodreads books](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks), supplements the set of Amazon reviews. This set contains more quantitative information, such as the number of written reviews and ratings a book has as well as its average rating.

## Functionality
Users can create an account using their email and/or provide a username. Through this they can submit reviews, save favorite books, and personalize their experience. After that they can customize their profiles by adding a bio, favorite genres, and reading interests. This helps in tailoring book suggestions to their tastes. Also, Users can search directly for books by title, author, genre, or ISBN. Advanced search options can also include filters like publication year, user ratings, or language. Each book has a dedicated page displaying information such as the synopsis, author, publication details, genre, user ratings, and reviews.

There will also be a more social media aspect to the application, where users can view the profiles of others and attempt to align their choice of readings with those that have similar tastes. This component will also allow for an automatic suggestion feature driven by overlap in users personal "libraries".

### UI Mockup

![ReadRealm0](https://github.com/cs411-alawini/sp24-cs411-team102-Nameless/assets/55030633/9fb94a58-4cde-44d6-ab52-0f7125d7a076)
![ReadRealm2](https://github.com/cs411-alawini/sp24-cs411-team102-Nameless/assets/55030633/b279bf0d-7e74-45f2-a75c-21e3bf592956)
![ReadRealm1](https://github.com/cs411-alawini/sp24-cs411-team102-Nameless/assets/55030633/9b875cbf-2c12-4e42-af9f-7ad92bd52dbb)


### Work Distribution

UI: Muhammad
Sign in:  Khalid
Handle Writing reviews: Ben and Rohan
Cleaning databases: Muhammad, Ben, Khalid, Rohan
Handle AI: Muhammad, Ben, Khalid, Rohan
How databases interact and join: Muhammad, Ben, Khalid, Rohan
