import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)


df = pd.read_csv('spotify_millsongdata.csv').head(10000)


df['text'] = df['text'].str.lower()


tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['text'])

@app.route('/recommend/<song>', methods=['GET'])
def recommend(song):
    
    song_tfidf = tfidf_vectorizer.transform([song.lower()])

    
    cosine_similarities = cosine_similarity(song_tfidf, tfidf_matrix).flatten()

    
    similar_song_indices = cosine_similarities.argsort()[:-11:-1]

    
    recommendations = df.iloc[similar_song_indices]

    
    recommendations_list = recommendations.to_dict(orient='records')

    return jsonify(recommendations_list)

if __name__ == '__main__':
    app.run(debug=True)
