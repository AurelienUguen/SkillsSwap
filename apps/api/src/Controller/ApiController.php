<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    #[Route('/api/search', name: 'app_api_search')]
  
    public function search(Request $request, CategoryRepository $categoryRepository): JsonResponse
    {
        $query = $request->query->get('query');

        $results = $categoryRepository->findByname($query);

        return new JsonResponse($results);
    }
}
