<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ParticipantRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use ApiPlatform\Metadata\ApiFilter;
use App\Controller\ParticipantController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ParticipantRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_participant']],
    denormalizationContext:['groups' => ['create_participant']],
    operations:[
        new Api\GetCollection(
            paginationEnabled: false,// Ceci supprime la limite d'utilisateur de 30 pour le login //
        ),
        new Api\GetCollection(
            name: 'count',
            uriTemplate: '/participants/count',
            controller: ParticipantController::class
        ),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Participant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_participant', 'read_user', 'read_message', 'read_convers'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'participants')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_user', 'read_participant', 'create_participant', 'read_message', 'create_message', 'read_convers'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'participants')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_user', 'read_participant', 'create_participant', 'read_message', 'create_message', 'read_convers'])]
    private ?Conversation $conversation = null;

    #[ORM\Column]
    #[Groups(['read_participant', 'create_participant', 'read_user', 'read_convers'])]
    private ?bool $isNewMsg = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getConversation(): ?Conversation
    {
        return $this->conversation;
    }

    public function setConversation(?Conversation $conversation): static
    {
        $this->conversation = $conversation;

        return $this;
    }

    public function isIsNewMsg(): ?bool
    {
        return $this->isNewMsg;
    }

    public function setIsNewMsg(bool $isNewMsg): static
    {
        $this->isNewMsg = $isNewMsg;

        return $this;
    }
}
