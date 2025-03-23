## Summary of Algorithm Theory and Experimental Results

### 1. Algorithm Theory

**Neighborhood-Based Collaborative Filtering (NBCF):**
- **Objective:** The NBCF algorithm is used to recommend products based on the similarity between users. It predicts a user's interest in unrated products based on the ratings of similar users.
- **Working Principle:**
  1. **Similarity Calculation:** Compute the similarity between users based on their ratings of products. Common methods for measuring similarity include Cosine Similarity and Pearson Correlation.
  2. **Identify Similar Users:** Select users with the highest similarity to the current user.
  3. **Predict Interest:** Use the ratings of similar users to predict the current user's interest in unrated products.

**Algorithm Steps:**
1. **Data Normalization:** Fill in missing values in the rating matrix using the average of known ratings.
2. **Similarity Calculation:** Use Cosine Similarity or Pearson Correlation to calculate the similarity between users.
3. **Rating Prediction:** Predict the user's ratings for unrated products using a weighted average of ratings from similar users.

### 2. Experimental Results

**Test Environment:**
- **Dataset:** Includes information about 20 users and 100 products, with interactions such as views, adding to cart, adding to wishlist, and purchase history.
- **Objective:** Test the performance and characteristics of the NBCF algorithm in a limited data environment.

**Experimental Results:**
1. **Similarity Calculation:** Pearson Correlation was used to calculate the similarity between users. The results showed that some users had high similarity with the current user.
2. **Rating Prediction:** The Normalized Ratings formula was used to predict the user's interest in unrated products. The predicted results were displayed as positive values, corresponding to products the user is likely to be interested in.
3. **Product Recommendations:** Based on the prediction results, the system provided a list of recommended products for the user. These products were displayed on the website's user interface.

**Conclusion:**
- The NBCF algorithm was successfully applied to recommend products based on user similarity.
- The experimental results showed that the algorithm can accurately predict user interest in unrated products.
- However, due to the small test dataset, the results may not fully reflect the algorithm's performance in a larger data environment.

**Future Development:**
- Optimize the algorithm to improve accuracy and performance.
- Expand the dataset to enhance prediction capabilities.
- Research and implement other recommendation methods such as Content-Based Filtering or Hybrid Recommendation to diversify the recommendation system.
