from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PromptsSerializer
from rest_framework import status
import os
from groq import Groq
import openai

# Create your views here.
class createConversation(APIView):
    def get_serializer(self, *args, **kwargs):
        return PromptsSerializer(*args, **kwargs)
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid():
            # Set model as OpenAI
            client = openai.OpenAI(
                base_url="https://api.groq.com/openai/v1",
                api_key=os.environ.get("GROQ_API_KEY")
            )

            conversationA = []
            conversationB = []
            chat_completion1 = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": serializer.data["prompt1"],
                    },
                ],
                model="llama3-8b-8192",
            )

            # Add to conversation
            conversationA.append(chat_completion1.choices[0].message.content)
            
            print(chat_completion1.choices[0].message.content)

            chat_completion2 = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": serializer.data["prompt2"],
                    }
                ],
                model="llama3-8b-8192",
            )

            # Add to conversation
            conversationB.append(chat_completion2.choices[0].message.content)

            print(chat_completion2.choices[0].message.content)
                
            tmp_completion = serializer.data["prompt2"]
            for i in range(10):
                chat_completion_a = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": tmp_completion
                        },
                        {
                            "role": "system",
                            "content": "The text given is the opposing argument. Write a response to this argument.",
                        },
                    ],
                    model="llama3-8b-8192",
                )

                conversationA.append(chat_completion_a.choices[0].message.content)

                chat_completion_b = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": chat_completion_a.choices[0].message.content
                        },
                        {
                            "role": "system",
                            "content": "The text given is the opposing argument. Write a response to this argument.",
                        },
                    ],
                    model="llama3-8b-8192",
                )

                conversationB.append(chat_completion_b.choices[0].message.content)
                tmp_completion = chat_completion_b.choices[0].message.content
            
            print(conversationA)
            print(conversationB)

            conversation = [conversationA, conversationB]
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class getNextMessage(APIView):
    def get(self, request):
        client = Groq(
            api_key=os.environ.get("GROQ_API_KEY"),
        )

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Hello",
                },
            ],
            model="llama3-8b-8192",
        )

        return Response(chat_completion.choices[0].message.content, status=status.HTTP_200_OK)
