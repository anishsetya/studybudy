from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import re
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token



class UserRegistrationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        
        if not username or not password:
            return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    
class UserLoginView(APIView):
    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username ,password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# api/views.py
import io
from PyPDF2 import PdfReader
from mistralai import Mistral

api_key = "ohjt6SuF4jAFvPSMlX3ezGarPZCYJYON"
model = "mistral-large-latest"
client = Mistral(api_key=api_key)

class FlashcardGenerationView(APIView):
    def post(self, request):
        pdf_file = request.FILES.get('pdfFile')
        try:
            num_questions = int(request.data.get('num', 3))  # Convert to integer
        except (ValueError, TypeError):
            num_questions = 3 
        print(num_questions)
        difficulty = request.data.get('difficulty')

        if not pdf_file:
            return Response({'error': 'No PDF file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        if not num_questions or not difficulty:
            return Response({'error': 'Missing additional parameters'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            reader = PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        except Exception as e:
            return Response({'error': f'Error parsing PDF: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Generate flashcards (simple logic)
        # sentences = re.split(r'(?<=[.!?]) +', text)
        cards = []
        
        chat_response = client.chat.complete(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Generate {num_questions} {difficulty} educational flashcards from the following content. "
                        "Respond ONLY with the following  format:\n\n"
                        'cards = [\n'
                        '  { front: "Question 1", back: "Answer 1" },\n'
                        '  { front: "Question 2", back: "Answer 2" },\n'
                        '  { front: "Question 3", back: "Answer 3" }\n'
                        '];\n\n'
                        f"CONTENT:\n{text}"
                    ),
                },
            ]
        )
        raw_string=chat_response.choices[0].message.content


        if not cards:
            cards = [{'front': 'No questions generated', 'back': 'Not enough text.'}]

        match = re.search(r'cards\s*=\s*(\[[\s\S]*?\]);', raw_string)
        card_block = match.group(1) if match else "[]"
        card_block_json_like = re.sub(r'(\bfront\b|\bback\b):', r'"\1":', card_block)
        cards = json.loads(card_block_json_like)
        print(cards)

        return Response({
            'cards': cards,
            'num_questions': num_questions,
            'difficulty': difficulty,
            'pdf_file_name': pdf_file.name,
            'extracted_text_preview': text[:200]
        }, status=status.HTTP_200_OK)
