from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PromptsSerializer
from rest_framework import status
import os
from groq import Groq
import openai

max_limit = 100
temp = 0.6
#prompt = f"Remember, you are trying to advocate for: "{prompt1}" The text given is the opposing argument. Write a brief response to this argument. Be aggresive toward the opponent, but be reasonable."
#setup_prompt = "Prove why the prompt is right."

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

            sysprompt1 = f"Remember, you are trying to advocate for: '{serializer.data['prompt1']}' The text given is the opposing argument. Write a brief response to this argument. Be aggresive toward the opponent, but be reasonable."
            sysprompt2 = f"Remember, you are trying to advocate for: '{serializer.data['prompt2']}' The text given is the opposing argument. Write a brief response to this argument. Be aggresive toward the opponent, but be reasonable."


            # Conversation stemming from 1st prompt
            conversation1 = []

            # Conversation stemming from 2nd prompt
            conversation2 = []

            # Create the first prompt
            chat_completion1 = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": serializer.data["prompt1"],
                    },
                    #{
                    #    "role": "system",
                    #    "content": setup_prompt,
                    #},
                ],
                model="llama3-8b-8192",
                #max_tokens=max_limit,
                temperature=temp
            )

            # Add to conversation A
            conversation1.append(chat_completion1.choices[0].message.content)

            # Create the second prompt
            chat_completion2 = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": serializer.data["prompt2"],
                    },
                    #{
                    #    "role": "system",
                    #    "content": setup_prompt,
                    #},
                ],
                model="llama3-8b-8192",
                #max_tokens=max_limit,
                temperature=temp
            )

            # Add to conversation B
            conversation2.append(chat_completion2.choices[0].message.content)
                
            # Create a tmp completion for loop around, starting value is the second prompt
            tmp_completion = serializer.data["prompt2"]

            # Get number of messages/prompts to generate
            nmessages = int(serializer.data["nmessages"])
            if nmessages > 30:
                nmessages = 30

            # Generate the conversation
            for i in range(nmessages - 2):
                chat_completion_a = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": tmp_completion
                        },
                        {
                            "role": "system",
                            "content": sysprompt2,
                        },
                    ],
                    model="llama3-8b-8192",
                    #max_tokens=max_limit,
                    temperature=temp
                )

                conversation1.append(chat_completion_a.choices[0].message.content)

                chat_completion_b = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": chat_completion_a.choices[0].message.content
                        },
                        {
                            "role": "system",
                            "content": sysprompt1,
                        },
                    ],
                    model="llama3-8b-8192",
                    #max_tokens=max_limit,
                    temperature=temp
                )

                conversation2.append(chat_completion_b.choices[0].message.content)
                tmp_completion = chat_completion_b.choices[0].message.content
            
            chat_completion_a = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": tmp_completion
                        },
                        {
                            "role": "system",
                            "content": sysprompt2+" Conclude your argument.",
                        },
                    ],
                    model="llama3-8b-8192",
                    #max_tokens=max_limit,
                    temperature=temp
            )
            conversation1.append(chat_completion_a.choices[0].message.content)

            chat_completion_b = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": chat_completion_a.choices[0].message.content
                    },
                        { 
                            "role": "system",
                            "content": sysprompt2+" Conclude your argument.",
                        },
                ],
                model="llama3-8b-8192",
                #max_tokens=max_limit,
                temperature=temp
            )
            conversation2.append(chat_completion_b.choices[0].message.content)

            # Package the data
            conversation = [conversation1, conversation2]
            data = {
                "conversation": conversation
            }

            # Return the data
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)