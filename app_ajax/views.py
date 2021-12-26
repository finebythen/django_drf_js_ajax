from django.shortcuts import render


def main(request):
    return render(request, 'app_ajax/main.html')
