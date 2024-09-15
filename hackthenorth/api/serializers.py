from rest_framework import serializers

class PromptsSerializer(serializers.Serializer):
    prompt1 = serializers.CharField(max_length=100)
    prompt2 = serializers.CharField(max_length=100)
    nmessages = serializers.IntegerField()