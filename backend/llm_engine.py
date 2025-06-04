from transformers import pipeline

# Load a text generation model (gpt2 for example)
generator = pipeline('text-generation', model='gpt2')

def generate_text(prompt, max_tokens=100):
    response = generator(prompt, max_length=max_tokens, num_return_sequences=1)
    return response[0]['generated_text']
