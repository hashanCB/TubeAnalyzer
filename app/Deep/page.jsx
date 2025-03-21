'use client';

import { useState } from 'react';
import { pipeline, env } from '@xenova/transformers';

// Enable debug logging to see fetch details
env.logLevel = 'debug';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSentiment = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      console.log('Loading pipeline for Xenova/distilbert-base-uncased-finetuned-sst-2-english...');
      const classifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
      console.log('Pipeline loaded successfully');
      const output = await classifier(text);
      setResult(output[0]);
    } catch (err) {
      setError('Failed to load model or analyze sentiment. Check your network and try again.');
      console.error('Error:', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Sentiment Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        rows="4"
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
      />
      <button
        onClick={analyzeSentiment}
        disabled={loading || !text}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading || !text ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
      >
        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Result:</h3>
          <p>
            Sentiment: <strong>{result.label}</strong> (Confidence: {(result.score * 100).toFixed(2)}%)
          </p>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
          {error}
        </div>
      )}
    </div>
  );
}