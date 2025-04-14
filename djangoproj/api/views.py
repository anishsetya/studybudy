from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import re

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
from PyPDF2 import PdfReader

class FlashcardGenerationView(APIView):
    def post(self, request):
        pdf_file = request.FILES.get('pdfFile')
        num_questions = int(request.data.get('num', 3))
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
        # for i in range(min(num_questions, len(sentences))):
        #     question = f"Q{i+1}: What does this mean: \"{sentences[i][:40]}...\"?"
        #     answer = sentences[i]
        #     cards.append({'front': question, 'back': answer})

        # if not cards:
        cards = [{'front': 'No questions generated', 'back': 'Not enough text.'}]

        return Response({
            'cards': cards,
            'num_questions': num_questions,
            'difficulty': difficulty,
            'pdf_file_name': pdf_file.name,
            'extracted_text_preview': text[:200]
        }, status=status.HTTP_200_OK)


# class GenerateFlashcardsView(APIView):
#     def post(self, request):
#         text = request.data.get('text')
#         try:
#             num_questions = int(request.data.get('num', 3))
#         except (ValueError, TypeError):
#             num_questions = 3
#         difficulty = request.data.get('difficulty', 'medium')

#         if not text:
#             return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)

#         # --- Flashcard Generation Logic ---
#         # Split the text into sentences (a simple approach)
#         sentences = re.split(r'(?<=[.!?]) +', text)
#         cards = []
#         # In production, you might use NLP or an LLM to generate better questions.
#         for i in range(min(num_questions, len(sentences))):
#             # Create a simple question using a snippet from the sentence
#             question = f"Q{i+1}: What does this mean: \"{sentences[i][:40]}...\"?"
#             answer = sentences[i]
#             cards.append({'front': question, 'back': answer})

#         if not cards:
#             cards = [{'front': 'No questions generated', 'back': 'Not enough text.'}]

#         return Response({'cards': cards}, status=status.HTTP_200_OK)
