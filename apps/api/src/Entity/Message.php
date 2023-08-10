<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use DateTime;
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
    private ?bool $is_read = null;

    #[ORM\Column]
    #[Groups(['read_message', 'create_message', 'read_user','read_convers'])]
    private ?\DateTime $created_at = null;

    public function __construct()
    {
        $this->created_at = new DateTime("now");
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
        return $this->is_read;
    }

    public function setIsRead(bool $is_read): static
    {
        $this->is_read = $is_read;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTime $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }
}
