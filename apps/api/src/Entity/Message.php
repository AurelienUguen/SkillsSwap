<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[Api\ApiResource(
    mercure: true,
    normalizationContext:['groups' => ['read_message']],
    denormalizationContext:['groups' => ['create_message']],
    operations:[
        new Api\GetCollection(
            paginationEnabled: false,// Ceci supprime la limite d'utilisateur de 30 pour le login //
        ),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_message', 'read_user', 'read_convers'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_message', 'create_message', 'read_user', 'read_convers'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['read_message', 'create_message', 'read_user', 'read_convers'])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read_message', 'create_message', 'read_user', 'read_convers'])]
    private ?User $owner = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read_message', 'create_message', 'read_user'])]
    private ?Conversation $conversation = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read_message', 'create_message', 'read_user','read_convers'])]
    private ?bool $isRead = null;

    #[ORM\Column]
    #[Groups(['read_message', 'create_message', 'read_user','read_convers'])]
    private ?\DateTime $createdAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

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

    public function isIsRead(): ?bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): static
    {
        $this->isRead = $isRead;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
